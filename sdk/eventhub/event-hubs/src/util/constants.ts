// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @hidden
 */
export const packageJsonInfo = {
  name: "@azure/event-hubs",
  version: "5.5.0"
};

/**
 * @internal
 */
export const idempotentProducerAmqpPropertyNames = {
  capability: "com.microsoft:idempotent-producer",
  epoch: "com.microsoft:producer-epoch",
  producerId: "com.microsoft:producer-id",
  producerSequenceNumber: "com.microsoft:producer-sequence-number"
} as const;
