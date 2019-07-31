// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import { EventHubClient } from "./eventHubClient";
import { EventPosition } from "./eventPosition";
import { PartitionContext } from "./partitionContext";
import { CheckpointManager, Checkpoint } from "./checkpointManager";
import { EventData } from "./eventData";
import { PumpManager } from "./pumpManager";
import { AbortSignalLike, AbortController } from "@azure/abort-controller";
import * as log from "./log";
import { cancellableDelay } from "./util/cancellableDelay";

/**
 * Reason for closing a PartitionProcessor.
 */
export enum CloseReason {
  /**
   * Ownership of the partition was lost or transitioned to a new processor instance.
   */
  OwnershipLost = "OwnershipLost",
  /**
   * The EventProcessor was shutdown.
   */
  Shutdown = "Shutdown",
  /**
   * The PartitionProcessor was shutdown for an unknown reason.
   */
  Unknown = "Unknown"
}

export interface PartitionProcessor {
  /**
   * Optional. Called when EPH begins processing a partition.
   */
  initialize?(): Promise<void>;
  /**
   * Optional. Called when EPH stops processing a partition.
   * This may occur when control of the partition switches to another EPH or when user stops EPH
   * TODO: update string -> CloseReason
   */
  close?(reason: CloseReason): Promise<void>;
  /**
   * Called when a batch of events have been received.
   */
  processEvents(events: EventData[]): Promise<void>;
  /**
   * Called when the underlying client experiences an error while receiving.
   */
  processError(error: Error): Promise<void>;
}

/**
 * used by PartitionManager to claim ownership.
 * returned by listOwnerships
 */
export interface PartitionOwnership {
  /**
   * @property The event hub name
   */
  eventHubName: string;
  /**
   * @property The consumer group name
   */
  consumerGroupName: string;
  /**
   * @property The unique instance identifier
   */
  instanceId: string;
  /**
   * @property The identifier of the Event Hub partition
   */
  partitionId: string;
  /**
   * @property
   * The owner level
   */
  ownerLevel: number;
  /**
   * @property The offset of the event.
   */
  offset?: number;
  /**
   * @property The sequence number of the event.
   */
  sequenceNumber?: number;
  /**
   * @property The last modified time.
   */
  lastModifiedTimeInMS?: number;
  /**
   * @property The unique identifier for the operation.
   */
  eTag?: string;
}

/**
 * The PartitionProcessorFactory is called by EPH whenever a new partition is about to be processed.
 */
export interface PartitionProcessorFactory {
  (context: PartitionContext, checkpointManager: CheckpointManager): PartitionProcessor;
}

/**
 * Interface for the plugin to be passed when creating the EventProcessorHost
 * to manage partition ownership and checkpoint creation.
 * Deals mainly with read/write to the chosen storage service
 */
export interface PartitionManager {
  /**
   * Called to get the list of all existing partition ownership from the underlying data store. Could return empty
   * results if there are is no existing ownership information.
   *
   * @param eventHubName The event hub name.
   * @param consumerGroupName The consumer group name.
   * @return A list of partition ownership details of all the partitions that have/had an owner.
   */
  listOwnerships(eventHubName: string, consumerGroupName: string): Promise<PartitionOwnership[]>;
  /**
   * Called to claim ownership of a list of partitions. This will return the list of partitions that were owned
   * successfully.
   *
   * @param partitionOwnerships The list of partition ownerships this instance is claiming to own.
   * @return A list of partitions this instance successfully claimed ownership.
   */
  claimOwnerships(partitionOwnerships: PartitionOwnership[]): Promise<PartitionOwnership[]>;
  /**
   * Updates the checkpoint in the data store for a partition.
   *
   * @param checkpoint The checkpoint.
   * @return The new eTag on successful update.
   */
  updateCheckpoint(checkpoint: Checkpoint): Promise<void>;
}

/**
 * Error handler that can be provided to receive notitifications for general errors.
 * This handler is called on occasions when an error occurs while managing partitions or
 * ownership for the partitions.
 */
export type EventProcessorErrorHandler = (error: Error) => void;

// Options passed when creating EventProcessor, everything is optional
export interface EventProcessorOptions {
  /**
   * Error handler that can be provided to receive notitifications for general errors.
   * This handler is called on occasions when an error occurs while managing partitions or
   * ownership for the partitions.
   */
  errorHandler?: EventProcessorErrorHandler;
  /**
   * The event position to use if there is no checkpoint data obtained by the `PartitionManager` for
   * a partition.
   */
  initialEventPosition?: EventPosition;
  /**
   * The maximum number of messages to receive in a single `PartitionProcessor` `processEvents` invocation.
   * Must be a value greater than 0.
   * Defaults to 1.
   */
  maxBatchSize?: number;
  /**
   * The maximum amount of time to wait to build up the requested message count for the batch.
   * If not provided, it defaults to 60 seconds.
   */
  maxWaitTimeInSeconds?: number;
}

/**
 * Describes the Event Processor Host to process events from an EventHub.
 * @class EventProcessorHost
 */
export class EventProcessor {
  private _consumerGroupName: string;
  private _eventHubClient: EventHubClient;
  private _partitionProcessorFactory: PartitionProcessorFactory;
  private _processorOptions: EventProcessorOptions;
  private _pumpManager: PumpManager;
  private _id: string = uuid();
  private _isRunning: boolean = false;
  private _loopTask?: PromiseLike<void>;
  private _abortController?: AbortController;

  constructor(
    consumerGroupName: string,
    eventHubClient: EventHubClient,
    partitionProcessorFactory: PartitionProcessorFactory,
    partitionManager: PartitionManager,
    options?: EventProcessorOptions
  ) {
    if (!options) options = {};

    this._consumerGroupName = consumerGroupName;
    this._eventHubClient = eventHubClient;
    this._partitionProcessorFactory = partitionProcessorFactory;
    this._processorOptions = options;
    this._pumpManager = new PumpManager(this._id, options);
  }

  private _notifyUserErrorHandler(error: Error) {
    try {
      if (typeof this._processorOptions.errorHandler === "function") {
        this._processorOptions.errorHandler(error);
      }
    } catch (err) {
      // swallow errors from user's error handler
      log.error(
        `[${this._id}] An error occured when invoking the user-provided EventProcessor error handler: ${err}`
      );
    }
  }

  private _validatePartitionProcessor(partitionProcessor: PartitionProcessor): void {
    if (partitionProcessor.close && typeof partitionProcessor.close !== "function") {
      throw new TypeError("'PartitionProcessor.close' must be 'undefined' or of type 'function'.");
    }
    if (partitionProcessor.initialize && typeof partitionProcessor.initialize !== "function") {
      throw new TypeError(
        "'PartitionProcessor.initialize' must be 'undefined' or of type 'function'."
      );
    }
    if (typeof partitionProcessor.processError !== "function") {
      throw new TypeError(
        "'PartitionProcessor.processError' must be defined and of type 'function'."
      );
    }
    if (typeof partitionProcessor.processEvents !== "function") {
      throw new TypeError(
        "'PartitionProcessor.processEvents' must be defined and of type 'function'."
      );
    }
  }

  private async _getInactivePartitions(): Promise<string[]> {
    try {
      // get all partition ids on the event hub
      const partitionIds = await this._eventHubClient.getPartitionIds();
      // get partitions this EventProcessor is actively processing
      const activePartitionIds = this._pumpManager.receivingFromPartitions();

      // get a list of partition ids that are not being processed by this EventProcessor
      const inactivePartitionIds: string[] = partitionIds.filter(
        (id) => activePartitionIds.indexOf(id) === -1
      );
      return inactivePartitionIds;
    } catch (err) {
      log.error(`[${this._id}] An error occured when retrieving partition ids: ${err}`);
      this._notifyUserErrorHandler(err);
      throw err;
    }
  }

  /**
   * Starts the EventProcessor loop.
   * Load-balancing and partition ownership should be checked inside the loop.
   * @ignore
   */
  private async _runLoop(abortSignal: AbortSignalLike): Promise<void> {
    // periodically check if there is any partition not being processed and process it
    const waitIntervalInMs = 30000;
    while (!abortSignal.aborted) {
      try {
        // get a list of partition ids that are not being processed by this EventProcessor
        const partitionsToAdd = await this._getInactivePartitions();
        // check if the loop has been cancelled
        if (abortSignal.aborted) {
          return;
        }

        const tasks: PromiseLike<void>[] = [];
        // create partition pumps to process any partitions we should be processing
        for (const partitionId of partitionsToAdd) {
          const partitionContext: PartitionContext = {
            consumerGroupName: this._consumerGroupName,
            eventHubName: this._eventHubClient.eventHubName,
            partitionId: partitionId
          };

          const checkpointManager = new CheckpointManager();

          log.eventProcessor(
            `[${this._id}] [${partitionId}] Calling user-provided PartitionProcessorFactory.`
          );
          const partitionProcessor = this._partitionProcessorFactory(
            partitionContext,
            checkpointManager
          );

          // validate the partition processor
          try {
            this._validatePartitionProcessor(partitionProcessor);
          } catch (err) {
            this._notifyUserErrorHandler(err);
            // it's unlikely a partition processor would be created incorrectly just sometimes,
            // so exit the loop early.
            try {
              await this._pumpManager.removeAllPumps(CloseReason.Unknown);
            } catch (err) {
              log.error(`[${this._id}] An error occured while removing all pumps: ${err}`);
            }
            this._isRunning = false;
            return;
          }

          // eventually this will 1st check if the existing PartitionOwnership has a position
          const eventPosition =
            this._processorOptions.initialEventPosition || EventPosition.earliest();

          tasks.push(
            this._pumpManager
              .createPump(this._eventHubClient, partitionContext, eventPosition, partitionProcessor)
              .catch((err) => {
                // notify the user if a pump couldn't be created
                this._notifyUserErrorHandler(err);
                throw err;
              })
          );
        }

        // wait for all the new pumps to be created
        await Promise.all(tasks);
        log.eventProcessor(`[${this._id}] PartitionPumps created within EventProcessor.`);

        // sleep
        log.eventProcessor(
          `[${this._id}] Pausing the EventProcessor loop for ${waitIntervalInMs} ms.`
        );
        await cancellableDelay(waitIntervalInMs, abortSignal);
      } catch (err) {
        log.error(`[${this._id}] An error occured within the EventProcessor loop: ${err}`);
      }
    }

    // loop has completed, remove all existing pumps
    return this._pumpManager.removeAllPumps(CloseReason.Shutdown);
  }

  /**
   * Indicates whether the `EventProcessor` is actively running.
   *
   * @return {boolean}
   */
  get isRunning(): boolean {
    return this._isRunning;
  }

  /**
   * Starts the event processor, fetching the list of partitions, and attempting to grab leases
   * For each successful lease, it will get the details from the blob and start a receiver at the
   * point where it left off previously.
   *
   * @return {void}
   */
  start(): void {
    if (this._isRunning) {
      log.eventProcessor(`[${this._id}] Attempted to start an already running EventProcessor.`);
      return;
    }

    this._isRunning = true;
    this._abortController = new AbortController();
    log.eventProcessor(`[${this._id}] Starting an EventProcessor.`);
    this._loopTask = this._runLoop(this._abortController.signal);
  }

  /**
   * Stops the EventProcessor from processing messages.
   * @return {Promise<void>}
   */
  async stop(): Promise<void> {
    log.eventProcessor(`[${this._id}] Stopping an EventProcessor.`);
    if (this._abortController) {
      // cancel the event processor loop
      this._abortController.abort();
    }

    this._isRunning = false;
    try {
      // waits for the event processor loop to complete
      // will complete immediately if _loopTask is undefined
      await this._loopTask;
    } catch (err) {
      log.error(`[${this._id}] An error occured while stopping the EventProcessor: ${err}`);
    } finally {
      log.eventProcessor(`[${this._id}] EventProcessor stopped.`);
    }
  }
}
