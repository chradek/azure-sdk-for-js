// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-amqp";
import chai from "chai";
const should = chai.should();

import { EventHubProducerClient } from "../../src/index";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";

describe("EventHubProducerClient", function() {
  const env = getEnvVars();
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const TEST_FAILURE = "test failure";

  before("validate environment", function(): void {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  let producerClient: EventHubProducerClient | undefined;

  afterEach("close existing producerClient", function() {
    return producerClient?.close();
  });

  describe("getPartitionPublishingProperties", function() {
    it("retrieves partition publishing properties", async function() {
      producerClient = new EventHubProducerClient(service.connectionString, service.path);

      const partitionIds = await producerClient.getPartitionIds();

      for (const partitionId of partitionIds) {
        const props = await producerClient.getPartitionPublishingProperties(partitionId);
        should.equal(
          props.isIdempotentPublishingEnabled,
          false,
          "Unexpected value for isIdempotentPublishingEnabled"
        );
        should.equal(props.partitionId, partitionId, "Unexpected value for partitionId");
        should.not.exist(
          props.lastPublishedSequenceNumber,
          "Expected lastPublishedSequenceNumber to not exist"
        );
        should.not.exist(props.ownerLevel, "Expected ownerLevel to not exist");
        should.not.exist(props.producerGroupId, "Expected producerGroupId to not exist");
      }
    });

    it("retrieves partition publishing properties (enableIdempotentPartitions)", async function() {
      producerClient = new EventHubProducerClient(service.connectionString, service.path, {
        enableIdempotentPartitions: true
      });

      const partitionIds = await producerClient.getPartitionIds();

      for (const partitionId of partitionIds) {
        const props = await producerClient.getPartitionPublishingProperties(partitionId);
        should.equal(
          props.isIdempotentPublishingEnabled,
          true,
          "Unexpected value for isIdempotentPublishingEnabled"
        );
        should.equal(props.partitionId, partitionId, "Unexpected value for partitionId");
        should.exist(
          props.lastPublishedSequenceNumber,
          "Expected lastPublishedSequenceNumber to exist"
        );
        should.exist(props.ownerLevel, "Expected ownerLevel to exist");
        should.exist(props.producerGroupId, "Expected producerGroupId to exist");
      }
    });

    it("throws an error if no partitionId is provided", async function() {
      producerClient = new EventHubProducerClient(service.connectionString, service.path);

      try {
        await producerClient.getPartitionPublishingProperties(undefined as any);
        throw new Error(TEST_FAILURE);
      } catch (err) {
        should.equal(err.name, "TypeError");
        should.not.equal(err.message, TEST_FAILURE);
      }
    });
  });

  describe("idempotent producer", function() {
    describe("does not allow partitionKey to be set", function() {
      it("createBatch", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        try {
          await producerClient.createBatch({ partitionKey: "foo" });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.equal(
            err.message,
            `"partitionKey" cannot be set while the EventHubProducerClient has "enableIdempotentPartitions" set to true.`
          );
        }
      });

      it("sendBatch", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        try {
          await producerClient.sendBatch([{ body: "test" }], { partitionKey: "foo" });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.equal(
            err.message,
            `"partitionId" must be supplied and "partitionKey" must not be provided while the EventHubProducerClient has "enableIdempotentPartitions" set to true.`
          );
        }
      });
    });

    describe("only allows sending directly to partitions", function() {
      it("supports partitionId set by createBatch", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        // Setting partitionId on the batch to send.
        const batch = await producerClient.createBatch({ partitionId: "0" });
        batch.tryAdd({ body: "test" });

        // Don't need to set partitionId on the producerClient.
        await producerClient.sendBatch(batch);
      });

      it("supports partitionId set by sendBatch", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        // Setting partitionId on the sendBatch call.
        await producerClient.sendBatch([{ body: "test" }], { partitionId: "0" });
      });

      it("throws an error if partitionId not set by createBatch", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        try {
          // Don't set partitionId, this should trigger the error.
          await producerClient.createBatch();
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.equal(
            err.message,
            `"partitionId" must be specified while the EventHubProducerClient has "enableIdempotentPartitions" set to true.`
          );
        }
      });

      it("throws an error if partitionId not set by sendBatch when passing EventData[]", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        try {
          // Don't set partitionId on the sendBatch call.
          await producerClient.sendBatch([{ body: "test" }]);
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.equal(
            err.message,
            `"partitionId" must be supplied and "partitionKey" must not be provided while the EventHubProducerClient has "enableIdempotentPartitions" set to true.`
          );
        }
      });
    });

    describe("concurrent sends", function() {
      it("are limited to one per partition", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        try {
          const batch1 = await producerClient.createBatch({ partitionId: "0" });
          batch1.tryAdd({
            body: "one"
          });

          await Promise.all([
            producerClient.sendBatch(batch1),
            producerClient.sendBatch([{ body: "two" }], { partitionId: "0" })
          ]);
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.not.equal(err.message, TEST_FAILURE);
        }

        // TODO: Remove delay once https://github.com/Azure/azure-sdk-for-js/issues/4422 is completed.
        // This delay gives initialization a change to complete so producer.close() does proper cleanup.
        await delay(1000);
      });

      it("has no impact on serial sends", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        const batch1 = await producerClient.createBatch({ partitionId: "0" });
        batch1.tryAdd({ body: "one" });

        await producerClient.sendBatch(batch1);
        await producerClient.sendBatch([{ body: "two" }], { partitionId: "0" });
      });

      it("are isolated per partition", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        await Promise.all([
          producerClient.sendBatch([{ body: "one" }], { partitionId: "0" }),
          producerClient.sendBatch([{ body: "two" }], { partitionId: "1" })
        ]);
      });
    });

    describe("with user-provided partitionOptions", function() {
      it("can use state from previous producerClient", async function() {
        const producerClient1 = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        // Send an item so we have some state to carry over to the next producerClient
        await producerClient1.sendBatch([{ body: "one" }], { partitionId: "0" });
        const partitionPublishingProps1 = await producerClient1.getPartitionPublishingProperties(
          "0"
        );

        // Create the 2nd producer
        const producerClient2 = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true,
          partitionOptions: {
            "0": {
              ownerLevel: partitionPublishingProps1.ownerLevel! + 1,
              producerGroupId: partitionPublishingProps1.producerGroupId,
              startingSequenceNumber: partitionPublishingProps1.lastPublishedSequenceNumber
            }
          }
        });

        await producerClient2.sendBatch([{ body: "two" }], { partitionId: "0" });
        const partitionPublishingProps2 = await producerClient2.getPartitionPublishingProperties(
          "0"
        );

        should.equal(
          partitionPublishingProps2.producerGroupId,
          partitionPublishingProps1.producerGroupId,
          "ProducerGroupId should match."
        );
        should.equal(
          partitionPublishingProps2.ownerLevel! > partitionPublishingProps1.ownerLevel!,
          true,
          "producer2 ownerLevel should be higher than producer1 ownerLevel."
        );
        should.equal(
          partitionPublishingProps2.lastPublishedSequenceNumber,
          partitionPublishingProps1.lastPublishedSequenceNumber! + 1,
          "producer2 lastPublishedSequenceNumber should be 1 higher than producer1 lastPublishedSequenceNumber."
        );

        return Promise.all([producerClient1.close(), producerClient2.close()]);
      });

      it("can use ownerLevel to kick off other producers", async function() {
        const producerClient1 = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        // Send an item so we have some state to carry over to the next producerClient
        await producerClient1.sendBatch([{ body: "one" }], { partitionId: "0" });
        const partitionPublishingProps1 = await producerClient1.getPartitionPublishingProperties(
          "0"
        );

        // Create the 2nd producer
        const producerClient2 = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true,
          partitionOptions: {
            "0": {
              ownerLevel: partitionPublishingProps1.ownerLevel! + 1,
              producerGroupId: partitionPublishingProps1.producerGroupId,
              startingSequenceNumber: partitionPublishingProps1.lastPublishedSequenceNumber
            }
          }
        });

        // Send an event!
        await producerClient2.sendBatch([{ body: "two" }], { partitionId: "0" });

        try {
          // Calling sendBatch with producerClient1 (lower ownerLevel) should fail.
          await producerClient1.sendBatch([{ body: "should fail" }], { partitionId: "0" });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.equal(err.name, "MessagingError");
          should.equal(err.code, "ProducerDisconnectedError");
          should.not.equal(err.message, TEST_FAILURE);
        }
        return Promise.all([producerClient1.close(), producerClient2.close()]);
      });

      it("fails with invalid state", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true,
          partitionOptions: {
            "0": {
              ownerLevel: -1
            }
          }
        });

        // Trigger an error by calling sendBatch.
        try {
          await producerClient.sendBatch([{ body: "one" }], { partitionId: "0" });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.equal(err.name, "MessagingError");
          should.equal(err.code, "ArgumentError");
          should.not.equal(err.message, TEST_FAILURE);
        }
      });
    });

    it("recovers from disconnects", async function() {
      producerClient = new EventHubProducerClient(service.connectionString, service.path, {
        enableIdempotentPartitions: true,
        retryOptions: {
          timeoutInMs: 5000,
          retryDelayInMs: 100
        }
      });

      const beforePublishingProps = await producerClient.getPartitionPublishingProperties("0");
      const clientConnectionContext = producerClient["_context"];
      const originalConnectionId = clientConnectionContext.connectionId;

      // Using setTimeout so we can trigger the disconnect
      // right after sendBatch is called.
      setTimeout(() => {
        // Trigger a disconnect on the underlying connection.
        clientConnectionContext.connection["_connection"].idle();
      }, 0);

      await producerClient.sendBatch([{ body: "disconnect" }], { partitionId: "0" });
      const newConnectionId = clientConnectionContext.connectionId;
      should.not.equal(originalConnectionId, newConnectionId);

      const afterPublishingProps = await producerClient.getPartitionPublishingProperties("0");

      should.equal(
        afterPublishingProps.ownerLevel,
        beforePublishingProps.ownerLevel,
        "ownerLevel should match."
      );
      should.equal(
        afterPublishingProps.producerGroupId,
        beforePublishingProps.producerGroupId,
        "producerGroupId should match."
      );
      should.equal(
        afterPublishingProps.lastPublishedSequenceNumber,
        beforePublishingProps.lastPublishedSequenceNumber! + 1,
        "afterPublishingProps.lastPublishedSequenceNumber should be 1 higher than beforePublishingProps"
      );
    });
  });
});
