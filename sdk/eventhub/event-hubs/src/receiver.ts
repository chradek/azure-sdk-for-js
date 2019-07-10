import { AbortSignalLike, AbortError } from "@azure/abort-controller";
import {
  RetryConfig,
  randomNumberFromInterval,
  Constants,
  RetryOperationType,
  retry
} from "@azure/core-amqp";
import "@azure/core-asynciterator-polyfill";
import { ConnectionContext } from "./connectionContext";
import { EventHubReceiver, OnMessage, OnError } from "./eventHubReceiver";
import { ReceivedEventData } from "./eventData";
import { EventHubConsumerOptions } from "./eventHubClient";
import { EventPosition } from "./eventPosition";
import * as log from "./log";
import { ReceiveHandler } from "./receiveHandler";
import { throwErrorIfConnectionClosed } from "./util/error";

/**
 * Options to pass when creating an iterator to iterate over events
 */
export interface EventIteratorOptions {
  /**
   * Number of events to fetch at a time in the background
   */
  // prefetchCount?: number;
  /**
   * An implementation of the `AbortSignalLike` interface to signal the `EventIterator` to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * A consumer is responsible for reading `EventData` from a specific Event Hub partition
 * in the context of a specific consumer group.
 *
 * Multiple consumers are allowed on the same partition in a consumer group.
 * If there is a need to have an exclusive consumer for a partition in a consumer group,
 * then specify the `ownerLevel` in the `options`.
 * Exclusive consumers were previously referred to as "Epoch Receivers".
 *
 * The consumer can be used to receive messages in a batch or by registering handlers.
 * Use the `createConsumer` function on the EventHubClient to instantiate an EventHubConsumer.
 * @class
 */
export class EventHubConsumer {
  private _baseConsumer?: EventHubReceiver;
  /**
   * @property Describes the amqp connection context for the QueueClient.
   */
  private readonly _connectionContext: ConnectionContext;
  /**
   * @property The consumer group from which the receiver should receive events from.
   */
  private readonly _consumerGroup: string;
  private readonly _consumerOptions: EventHubConsumerOptions;
  /**
   * @property Denotes if close() was called on this receiver.
   */
  private _isClosed: boolean = false;
  private _partitionId: string;

  private async _receiveBatch(
    maxMessageCount: number,
    maxWaitTimeInSeconds: number = 60,
    abortSignal?: AbortSignalLike
  ): Promise<ReceivedEventData[]> {
    // this shouldn't be able to happen since we
    // already checked if the receiver was closed.
    if (!this._baseConsumer) {
      return [];
    }

    // store events across multiple retries
    const receivedEvents: ReceivedEventData[] = [];

    const retrieveEvents = (): Promise<ReceivedEventData[]> => {
      return new Promise(async (resolve, reject) => {
        let timer: any;
        const logOnAbort = (): void => {
          const baseConsumer = this._baseConsumer;
          const name = baseConsumer && baseConsumer.name;
          const address = baseConsumer && baseConsumer.address;
          const desc: string =
            `[${this._connectionContext.connectionId}] The request operation on the Receiver "${name}" with ` +
            `address "${address}" has been cancelled by the user.`;
          log.error(desc);
        };

        const onAbort = (): void => {
          clearTimeout(timer);
          logOnAbort();
          if (this._baseConsumer) {
            this._baseConsumer.abort();
          } else {
            return reject(new AbortError("The receive operation has been cancelled by the user."));
          }
        };

        // operation has been cancelled, so exit immediately
        if (abortSignal && abortSignal.aborted) {
          logOnAbort();
          return reject(new AbortError("The receive operation has been cancelled by the user."));
        }

        // if this consumer was closed, _baseConsumer might be undefined.
        // resolve the operation's promise with the events collected thus far in case
        // the promise hasn't already been resolved.
        if (!this._baseConsumer) {
          return resolve(receivedEvents);
        }

        // updates the prefetch count so that the baseConsumer adds
        // the correct number of credits to receive the same number of events.
        const prefetchCount = Math.max(maxMessageCount - receivedEvents.length, 0);
        log.batching(
          "[%s] Receiver '%s', setting the prefetch count to %d.",
          this._connectionContext.connectionId,
          this._baseConsumer && this._baseConsumer.name,
          prefetchCount
        );
        this._baseConsumer.prefetchCount = prefetchCount;

        const cleanUpBeforeReturn = (): void => {
          if (this._baseConsumer) {
            this._baseConsumer.clearHandlers();
          }
          if (abortSignal) {
            abortSignal.removeEventListener("abort", onAbort);
          }
          clearTimeout(timer);
        };

        this._baseConsumer.registerHandlers(
          (eventData) => {
            receivedEvents.push(eventData);

            // resolve the operation's promise after the requested
            // number of events are received.
            if (receivedEvents.length === maxMessageCount) {
              log.batching(
                "[%s] Batching Receiver '%s', %d messages received within %d seconds.",
                this._connectionContext.connectionId,
                this._baseConsumer && this._baseConsumer.name,
                receivedEvents.length,
                maxWaitTimeInSeconds
              );
              cleanUpBeforeReturn();
              resolve(receivedEvents);
            }
          },
          reject,
          abortSignal
        );

        const addTimeout = (reuse: boolean = false): void => {
          let msg = "[%s] Setting the wait timer for %d seconds for receiver '%s'.";
          if (reuse) {
            msg += " Receiver link already present, hence reusing it.";
          }
          log.batching(
            msg,
            this._connectionContext.connectionId,
            maxWaitTimeInSeconds,
            this._baseConsumer && this._baseConsumer.name
          );

          // resolve the operation's promise after the requested
          // max number of seconds have passed.
          timer = setTimeout(() => {
            log.batching(
              "[%s] Batching Receiver '%s', %d messages received when max wait time in seconds %d is over.",
              this._connectionContext.connectionId,
              this._baseConsumer && this._baseConsumer.name,
              receivedEvents.length,
              maxWaitTimeInSeconds
            );
            cleanUpBeforeReturn();
            resolve(receivedEvents);
          }, maxWaitTimeInSeconds * 1000);
        };

        if (!this._baseConsumer.isOpen()) {
          try {
            // initializing the baseConsumer will also add credits.
            await this._baseConsumer.initialize();
            // the operation may have been cancelled while the connection
            // was being initialized. In this case, call abort.
            if (abortSignal && abortSignal.aborted) {
              return this._baseConsumer.abort();
            }
            addTimeout();
          } catch (err) {
            cleanUpBeforeReturn();
            return reject(err);
          }
        } else {
          addTimeout(true);
        }

        if (abortSignal) {
          abortSignal.addEventListener("abort", onAbort);
        }
      });
    };

    const retryOptions = this._consumerOptions.retryOptions;
    const jitterInSeconds = randomNumberFromInterval(1, 4);
    const maxRetries =
      retryOptions && retryOptions.maxRetries && retryOptions.maxRetries > 0
        ? retryOptions.maxRetries
        : Constants.defaultMaxRetries;
    const delayInSeconds =
      retryOptions && retryOptions.retryInterval && retryOptions.retryInterval > 0
        ? retryOptions.retryInterval / 1000
        : Constants.defaultDelayBetweenOperationRetriesInSeconds;

    const config: RetryConfig<ReceivedEventData[]> = {
      connectionHost: this._connectionContext.config.host,
      connectionId: this._connectionContext.connectionId,
      delayInSeconds: delayInSeconds + jitterInSeconds,
      operation: retrieveEvents,
      operationType: RetryOperationType.receiveMessage,
      maxRetries
    };
    return retry<ReceivedEventData[]>(config);
  }

  private throwIfAlreadyReceiving(): void {
    if (this.isReceivingMessages) {
      const errorMessage = `The EventHubConsumer for "${this._connectionContext.config.entityPath}" is already receiving messages.`;
      const error = new Error(errorMessage);
      log.error(`[${this._connectionContext.connectionId}] %O`, error);
      throw error;
    }
  }

  private throwIfReceiverOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._connectionContext);
    if (this.isClosed) {
      const errorMessage =
        `The EventHubConsumer for "${this._connectionContext.config.entityPath}" has been closed and can no longer be used. ` +
        `Please create a new EventHubConsumer using the "createConsumer" function on the EventHubClient.`;
      const error = new Error(errorMessage);
      log.error(`[${this._connectionContext.connectionId}] %O`, error);
      throw error;
    }
  }

  /**
   * @property The name of the consumer group that this consumer is associated with.
   * Events will be read only in the context of this group.
   * @readonly
   */
  get consumerGroup(): string {
    return this._consumerGroup;
  }

  /**
   * @property Returns `true` if the consumer is closed. This can happen either because the consumer
   * itself has been closed or the client that created it has been closed.
   * @readonly
   */
  get isClosed(): boolean {
    return this._isClosed || this._connectionContext.wasConnectionCloseCalled;
  }

  /**
   * Indicates whether the consumer is currently receiving messages or not.
   * When this returns true, new `receive()` or `receiveBatch()` calls cannot be made.
   */
  get isReceivingMessages(): boolean {
    if (this._baseConsumer && this._baseConsumer.isReceivingMessages) {
      return true;
    }

    return false;
  }

  /**
   * @property The owner level associated with an exclusive consumer; for a non-exclusive consumer, this value will be null or undefined.
   *
   * When provided, the owner level indicates that a consumer is intended to be the exclusive receiver of events for the
   * requested partition and the associated consumer group.
   * When multiple consumers exist for the same partition/consumer group pair, then the ones with lower or no
   * `ownerLevel` will get a `ReceiverDisconnectedError` during the next attempted receive operation.
   * @readonly
   */
  get ownerLevel(): number | undefined {
    return this._consumerOptions && this._consumerOptions.ownerLevel;
  }

  /**
   * @property The identifier of the Event Hub partition that this consumer is associated with.
   * Events will be read only from this partition.
   * @readonly
   */
  get partitionId(): string {
    return this._partitionId;
  }

  /**
   * @constructor
   * @internal
   * @ignore
   */
  constructor(
    connectionContext: ConnectionContext,
    consumerGroup: string,
    partitionId: string,
    eventPosition: EventPosition,
    options?: EventHubConsumerOptions
  ) {
    this._connectionContext = connectionContext;
    this._consumerGroup = consumerGroup;
    this._consumerOptions = options || {};
    this._partitionId = partitionId;
    this._baseConsumer = new EventHubReceiver(
      connectionContext,
      consumerGroup,
      partitionId,
      eventPosition,
      options
    );
  }

  /**
   * Closes the underlying AMQP receiver link.
   * Once closed, the consumer cannot be used for any further operations.
   * Use the `createConsumer` function on the EventHubClient to instantiate
   * a new EventHubConsumer.
   *
   * @returns
   * @throws {Error} Thrown if the underlying connection encounters an error while closing.
   */
  async close(): Promise<void> {
    try {
      if (this._connectionContext.connection && this._connectionContext.connection.isOpen()) {
        if (this._baseConsumer) {
          await this._baseConsumer.close();
          this._baseConsumer = void 0;
        }
      }
    } catch (err) {
      throw err;
    } finally {
      this._isClosed = true;
    }
  }

  /**
   * Returns an async iterable that retrieves events.
   *
   * The async iterable cannot indicate that it is done.
   * When using `for..await..of` to iterate over the events returned
   * by the async iterable, take care to exit the for loop after receiving the
   * desired number of messages, or provide an `AbortSignal` to control when to exit the loop.
   *
   * @param [options] A set of options to apply to an event iterator.
   */
  async *getEventIterator(
    options: EventIteratorOptions = {}
  ): AsyncIterableIterator<ReceivedEventData> {
    const maxMessageCount = 1;
    const maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;

    while (true) {
      const currentBatch = await this.receiveBatch(
        maxMessageCount,
        maxWaitTimeInSeconds,
        options.abortSignal
      );
      if (!currentBatch || !currentBatch.length) {
        continue;
      }
      yield currentBatch[0];
    }
  }

  /**
   * Starts the consumer by establishing an AMQP session and an AMQP receiver link on the session. Messages will be passed to
   * the provided onMessage handler and error will be passed to the provided onError handler.
   *
   * @param onMessage The message handler to receive event data objects.
   * @param onError The error handler to receive an error that occurs
   * while receiving messages.
   * @param abortSignal An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   * @returns ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   * @throws {TypeError} Thrown if a required parameter is missing.
   * @throws {Error} Thrown if the underlying connection or receiver has been closed.
   * Create a new EventHubConsumer using the EventHubClient createConsumer method.
   * @throws {Error} Thrown if the receiver is already receiving messages.
   */
  receive(onMessage: OnMessage, onError: OnError, abortSignal?: AbortSignalLike): ReceiveHandler {
    this.throwIfReceiverOrConnectionClosed();
    this.throwIfAlreadyReceiving();

    if (!this._baseConsumer) {
      throw new Error("TODO"); // TODO
    }

    if (typeof onMessage !== "function") {
      throw new TypeError("The parameter 'onMessage' must be of type 'function'.");
    }
    if (typeof onError !== "function") {
      throw new TypeError("The parameter 'onError' must be of type 'function'.");
    }

    // return immediately if the abortSignal is already aborted.
    if (abortSignal) {
      if (abortSignal.aborted) {
        onError(new AbortError("The receive operation has been cancelled by the user."));
        return new ReceiveHandler(this._baseConsumer);
      }

      abortSignal.addEventListener("abort", () => {
        if (this._baseConsumer) {
          this._baseConsumer.abort();
        }
      });
    }

    this._baseConsumer.prefetchCount = Constants.defaultPrefetchCount;
    if (!this._baseConsumer.isOpen()) {
      this._baseConsumer
        .initialize()
        .then((): any => {
          if (!this._baseConsumer) {
            return;
          }
          this._baseConsumer.registerHandlers(onMessage, onError, abortSignal);
          if (abortSignal && abortSignal.aborted) {
            return this._baseConsumer.abort();
          }
          return;
        })
        .catch((err) => {
          onError(err);
        });
    } else {
      this._baseConsumer.registerHandlers(onMessage, onError, abortSignal);
    }

    return new ReceiveHandler(this._baseConsumer);
  }

  /**
   * Receives a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
   * happens first. This method can be used directly after creating the consumer object and **MUST NOT** be used along with the `start()` method.
   *
   * @param maxMessageCount The maximum number of messages to receive in this batch. Must be a value greater than 0.
   * @param [maxWaitTimeInSeconds] The maximum amount of time to wait to build up the requested message count for the batch;
   * If not provided, it defaults to 60 seconds.
   * @param abortSignal An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @returns Promise<ReceivedEventData[]>.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   * @throws {MessagingError} Thrown if an error is encountered while receiving a message.
   * @throws {Error} Thrown if the underlying connection or receiver has been closed.
   * Create a new EventHubConsumer using the EventHubClient createConsumer method.
   * @throws {Error} Thrown if the receiver is already receiving messages.
   */
  async receiveBatch(
    maxMessageCount: number,
    maxWaitTimeInSeconds: number = 60,
    abortSignal?: AbortSignalLike
  ): Promise<ReceivedEventData[]> {
    this.throwIfReceiverOrConnectionClosed();
    this.throwIfAlreadyReceiving();

    try {
      return await this._receiveBatch(maxMessageCount, maxWaitTimeInSeconds, abortSignal);
    } catch (err) {
      log.error(
        "[%s] Receiver '%s', an error occurred while receiving %d messages for %d max time:\n %O",
        this._connectionContext.connectionId,
        this._baseConsumer && this._baseConsumer.name,
        maxMessageCount,
        maxWaitTimeInSeconds,
        err
      );
      throw err;
    }
  }
}
