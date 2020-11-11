// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
const assert = chai.assert;
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { delay } from "rhea-promise";
import { TestMessage } from "./utils/testUtils";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  getRandomTestClientTypeWithNoSessions,
  AutoGeneratedEntity
} from "./utils/testutils2";
import { ServiceBusReceiver } from "../src/receivers/receiver";
import { ServiceBusSender } from "../src/sender";
import { ServiceBusReceivedMessage } from "../src/serviceBusMessage";
import { ProcessErrorArgs } from "../src/models";
import { InvalidOperationForPeekedMessage } from "../src/util/errors";

describe("Message Lock Renewal", () => {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: ServiceBusSender;

  const testClientType = getRandomTestClientTypeWithNoSessions();
  let autoGeneratedEntity: AutoGeneratedEntity;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  beforeEach(async () => {
    autoGeneratedEntity = await serviceBusClient.test.createTestEntities(testClientType);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(autoGeneratedEntity.queue ?? autoGeneratedEntity.topic!)
    );
  });

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
  });

  it(
    testClientType + ": Batch Receiver: renewLock() resets lock duration each time.",
    async function(): Promise<void> {
      await testBatchReceiverManualLockRenewalHappyCase(sender);
    }
  );

  it(
    testClientType + ": Batch Receiver: complete() after lock expiry with throws error",
    async function(): Promise<void> {
      await testBatchReceiverManualLockRenewalErrorOnLockExpiry(sender);
    }
  );

  it(
    testClientType + ": Streaming Receiver: renewLock() resets lock duration each time.",
    async function(): Promise<void> {
      await testStreamingReceiverManualLockRenewalHappyCase(sender);
    }
  );

  it(testClientType + ": cannot renew lock on peeked message", async function(): Promise<void> {
    const receiver = await serviceBusClient.test.createPeekLockReceiver(autoGeneratedEntity);

    const testMessage = TestMessage.getSample();
    await sender.sendMessages(testMessage);

    const [peekedMsg] = await receiver.peekMessages(1);
    try {
      await receiver.renewMessageLock(peekedMsg);
      assert.fail("renewMessageLock should have failed");
    } catch (error) {
      should.equal(error.message, InvalidOperationForPeekedMessage);
    }

    // Clean up any left over messages
    const [unprocessedMsg] = await receiver.receiveMessages(1);
    await receiver.completeMessage(unprocessedMsg);
  });

  const receiveMethodType: ("subscribe" | "receive" | "iterator")[] = [
    "iterator",
    "subscribe",
    "receive"
  ];

  describe(`Using configurable renew durations`, () => {
    receiveMethodType.forEach((receiveMethodType) => {
      it(`${testClientType}: [${receiveMethodType}] Streaming Receiver: complete() after lock expiry with auto-renewal disabled throws error`, async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(sender, receiveMethodType, {
          maxAutoRenewDurationInMs: 0,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          willCompleteFail: true
        });
      });
    });

    receiveMethodType.forEach((receiveMethodType) => {
      it(`${testClientType}: [${receiveMethodType}] : Streaming Receiver: lock will not expire until configured time`, async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(sender, receiveMethodType, {
          maxAutoRenewDurationInMs: 38 * 1000,
          delayBeforeAttemptingToCompleteMessageInSeconds: 35,
          willCompleteFail: false
        });
      });
    });

    receiveMethodType.forEach((receiveMethodType) => {
      it(`${testClientType}: [${receiveMethodType}] : Streaming Receiver: lock expires sometime after configured time`, async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(sender, receiveMethodType, {
          maxAutoRenewDurationInMs: 35 * 1000,
          delayBeforeAttemptingToCompleteMessageInSeconds: 55,
          willCompleteFail: true
        });
      }).timeout(95000 + 30000);
    });

    receiveMethodType.forEach((receiveMethodType) => {
      it(`${testClientType}: [${receiveMethodType}] Streaming Receiver: No lock renewal when config value is less than lock duration`, async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(sender, receiveMethodType, {
          maxAutoRenewDurationInMs: 15 * 1000,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          willCompleteFail: true
        });
      });
    });
  });

  const lockDurationInMilliseconds = 30000;

  let uncaughtErrorFromHandlers: Error | undefined;

  async function processError(args: ProcessErrorArgs): Promise<void> {
    uncaughtErrorFromHandlers = args.error;
  }

  /**
   * Test renewLock() after receiving a message using Batch Receiver
   */
  async function testBatchReceiverManualLockRenewalHappyCase(
    sender: ServiceBusSender
  ): Promise<void> {
    const receiver = await serviceBusClient.test.createPeekLockReceiver(autoGeneratedEntity, {
      maxAutoLockRenewalDurationInMs: 0
    });

    const testMessage = TestMessage.getSample();
    await sender.sendMessages(testMessage);

    const msgs = await receiver.receiveMessages(1);

    // Compute expected initial lock expiry time
    const expectedLockExpiryTimeUtc = new Date();
    expectedLockExpiryTimeUtc.setSeconds(
      expectedLockExpiryTimeUtc.getSeconds() + lockDurationInMilliseconds / 1000
    );

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");

    // Verify initial lock expiry time on the message
    assertTimestampsAreApproximatelyEqual(
      msgs[0].lockedUntilUtc,
      expectedLockExpiryTimeUtc,
      "Initial"
    );

    await delay(5000);
    if (msgs[0].lockToken) {
      await receiver.renewMessageLock(msgs[0]);
    }

    // Compute expected lock expiry time after renewing lock after 5 seconds
    expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

    // Verify lock expiry time after renewLock()
    assertTimestampsAreApproximatelyEqual(
      msgs[0].lockedUntilUtc,
      expectedLockExpiryTimeUtc,
      "After renewlock()"
    );

    await receiver.completeMessage(msgs[0]);
  }

  /**
   * Test settling of message from Batch Receiver fails after message lock expires
   */
  async function testBatchReceiverManualLockRenewalErrorOnLockExpiry(
    sender: ServiceBusSender
  ): Promise<void> {
    const receiver = await serviceBusClient.test.createPeekLockReceiver(autoGeneratedEntity, {
      maxAutoLockRenewalDurationInMs: 0
    });

    const testMessage = TestMessage.getSample();
    await sender.sendMessages(testMessage);

    const msgs = await receiver.receiveMessages(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Expected message length does not match");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");

    // sleeping for long enough to let the message expire (we assume
    // the remote entity is using the default duration of 30 seconds for their locks)
    await delay(lockDurationInMilliseconds + 1000);

    let errorWasThrown: boolean = false;
    await receiver.completeMessage(msgs[0]).catch((err) => {
      should.equal(err.code, "MessageLockLost", "Error code is different than expected");
      errorWasThrown = true;
    });

    should.equal(errorWasThrown, true, "Error thrown flag must be true");

    // Clean up any left over messages
    const unprocessedMsgsBatch = await receiver.receiveMessages(1);
    await receiver.completeMessage(unprocessedMsgsBatch[0]);
  }

  /**
   * Test renewLock() after receiving a message using Streaming Receiver with autoLockRenewal disabled
   */
  async function testStreamingReceiverManualLockRenewalHappyCase(
    sender: ServiceBusSender
  ): Promise<void> {
    const receiver = await serviceBusClient.test.createPeekLockReceiver(autoGeneratedEntity, {
      maxAutoLockRenewalDurationInMs: 0
    });

    let numOfMessagesReceived = 0;
    const testMessage = TestMessage.getSample();
    await sender.sendMessages(testMessage);

    async function processMessage(brokeredMessage: ServiceBusReceivedMessage): Promise<void> {
      if (numOfMessagesReceived < 1) {
        numOfMessagesReceived++;

        should.equal(
          brokeredMessage.body,
          testMessage.body,
          "MessageBody is different than expected"
        );
        should.equal(
          brokeredMessage.messageId,
          testMessage.messageId,
          "MessageId is different than expected"
        );

        // Compute expected initial lock expiry time
        const expectedLockExpiryTimeUtc = new Date();
        expectedLockExpiryTimeUtc.setSeconds(
          expectedLockExpiryTimeUtc.getSeconds() + lockDurationInMilliseconds / 1000
        );

        // Verify initial expiry time on message
        assertTimestampsAreApproximatelyEqual(
          brokeredMessage.lockedUntilUtc,
          expectedLockExpiryTimeUtc,
          "Initial"
        );

        await delay(5000);
        await receiver.renewMessageLock(brokeredMessage);

        // Compute expected lock expiry time after renewing lock after 5 seconds
        expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

        // Verify actual expiry time on session after first renewal
        assertTimestampsAreApproximatelyEqual(
          brokeredMessage.lockedUntilUtc,
          expectedLockExpiryTimeUtc,
          "After renewlock"
        );

        await receiver.completeMessage(brokeredMessage);
      }
    }

    receiver.subscribe(
      { processMessage, processError },
      {
        autoComplete: false
      }
    );
    await delay(10000);
    await receiver.close();

    if (uncaughtErrorFromHandlers) {
      chai.assert.fail(uncaughtErrorFromHandlers.message);
    }

    should.equal(numOfMessagesReceived, 1, "Unexpected number of messages");
  }

  interface AutoLockRenewalTestOptions {
    maxAutoRenewDurationInMs: number | undefined;
    delayBeforeAttemptingToCompleteMessageInSeconds: number;
    willCompleteFail: boolean;
  }

  async function testAutoLockRenewalConfigBehavior(
    sender: ServiceBusSender,
    type: "subscribe" | "receive" | "iterator",
    options: AutoLockRenewalTestOptions
  ): Promise<void> {
    const expectedMessage = TestMessage.getSample(`${type} ${Date.now().toString()}`);
    await sender.sendMessages(expectedMessage);

    const receiver = await serviceBusClient.test.createPeekLockReceiver(autoGeneratedEntity, {
      maxAutoLockRenewalDurationInMs: options.maxAutoRenewDurationInMs
    });

    try {
      const actualMessage = await receiveSingleMessageUsingSpecificReceiveMethod(receiver, type);

      should.equal(
        actualMessage.body,
        expectedMessage.body,
        "MessageBody is different than expected"
      );
      should.equal(
        actualMessage.messageId,
        expectedMessage.messageId,
        "MessageId is different than expected"
      );

      // Sleeping...
      await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000);

      try {
        await receiver.completeMessage(actualMessage);

        if (options.willCompleteFail) {
          should.fail("complete() should throw an error");
        }
      } catch (err) {
        if (options.willCompleteFail) {
          should.equal(err.code, "MessageLockLost", "Error code is different than expected");
        } else {
          throw err;
        }
      }
    } finally {
      try {
        const purgingReceiver = await serviceBusClient.test.createReceiveAndDeleteReceiver(
          autoGeneratedEntity
        );
        await purgingReceiver.receiveMessages(10, { maxWaitTimeInMs: 1000 });
      } catch (err) {
        // ignore these errors
      }
    }
  }

  async function receiveSingleMessageUsingSpecificReceiveMethod(
    receiver: ServiceBusReceiver,
    type: "subscribe" | "receive" | "iterator"
  ): Promise<ServiceBusReceivedMessage> {
    switch (type) {
      case "subscribe": {
        return await new Promise((resolve, reject) => {
          receiver.subscribe(
            {
              processMessage: async (msg) => resolve(msg),
              processError: async (err) => reject(err)
            },
            {
              autoComplete: false
            }
          );
        });
      }
      case "receive": {
        const messages = await receiver.receiveMessages(1);
        should.equal(1, messages.length);
        return messages[0];
      }
      case "iterator": {
        for await (const message of receiver.getMessageIterator()) {
          return message;
        }
        throw new Error("Failed to get message using iterator");
      }
      default:
        throw new Error(`No receive method corresponds to type ${type}`);
    }
  }

  function assertTimestampsAreApproximatelyEqual(
    actualTimeInUTC: Date | undefined,
    expectedTimeInUTC: Date,
    label: string
  ): void {
    if (actualTimeInUTC) {
      should.equal(
        Math.pow((actualTimeInUTC.valueOf() - expectedTimeInUTC.valueOf()) / 1000, 2) < 9, // Within +/- 3 seconds
        true,
        `${label}: Actual time ${actualTimeInUTC} must be approximately equal to ${expectedTimeInUTC}`
      );
    }
  }
});
