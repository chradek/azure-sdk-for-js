// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const associatedLinkName = "associated-link-name";
const partitionKey = "x-opt-partition-key";
const sequenceNumber = "x-opt-sequence-number";
const enqueueSequenceNumber = "x-opt-enqueue-sequence-number";
const enqueuedTime = "x-opt-enqueued-time";
const scheduledEnqueueTime = "x-opt-scheduled-enqueue-time";
const offset = "x-opt-offset";
const lockedUntil = "x-opt-locked-until";
const partitionIdName = "x-opt-partition-id";
const publisher = "x-opt-publisher-name";
const viaPartitionKey = "x-opt-via-partition-key";
const deadLetterSource = "x-opt-deadletter-source";
const enqueuedTimeAnnotation = `amqp.annotation.${enqueuedTime}`;
const offsetAnnotation = `amqp.annotation.${offset}`;
const sequenceNumberAnnotation = `amqp.annotation.${sequenceNumber}`;
const guidSize = 16;
const message = "message";
const error = "error";
const statusCode = "status-code";
const statusDescription = "status-description";
const errorCondition = "error-condition";
const management = "$management";
const partition = "partition";
const partitionId = "partitionId";
const readOperation = "READ";
const TLS = "tls";
const establishConnection = "establishConnection";
const defaultConsumerGroup = "$default";
const eventHub = "eventhub";
const cbsEndpoint = "$cbs";
const cbsReplyTo = "cbs";
const operationPutToken = "put-token";
const aadEventHubsAudience = "https://eventhubs.azure.net/";
const aadEventHubsScope = "https://eventhubs.azure.net//.default";
const aadServiceBusAudience = "https://servicebus.azure.net/";
const aadServiceBusScope = "https://servicebus.azure.net//.default";
const maxUserAgentLength = 512;
const vendorString = "com.microsoft";
const attachEpoch = `${vendorString}:epoch`;
const receiverIdentifierName = `${vendorString}:receiver-name`;
const enableReceiverRuntimeMetricName = `${vendorString}:enable-receiver-runtime-metric`;
const timespan = `${vendorString}:timespan`;
const uri = `${vendorString}:uri`;
const dateTimeOffset = `${vendorString}:datetime-offset`;
const sessionFilterName = `${vendorString}:session-filter`;
const receiverError = "receiver_error";
const senderError = "sender_error";
const sessionError = "session_error";
const connectionError = "connection_error";
const defaultOperationTimeoutInMs = 60000;
const defaultConnectionIdleTimeoutInMs = 60000;
const managementRequestKey = "managementRequest";
const negotiateCbsKey = "negotiateCbs";
const negotiateClaim = "negotiateClaim";
const ensureContainerAndBlob = "ensureContainerAndBlob";
const defaultPrefetchCount = 1000;
const reconnectLimit = 100;
const maxMessageIdLength = 128;
const maxPartitionKeyLength = 128;
const maxSessionIdLength = 128;
const pathDelimiter = "/";
const ruleNameMaximumLength = 50;
const maximumSqlFilterStatementLength = 1024;
const maximumSqlRuleActionStatementLength = 1024;
const maxDeadLetterReasonLength = 4096;
// https://stackoverflow.com/questions/11526504/minimum-and-maximum-date for js
// However we are setting this to the TimeSpan.MaxValue of C#.
const maxDurationValue = 922337203685477;
const minDurationValue = -922337203685477;
// https://github.com/Azure/azure-amqp/blob/master/Microsoft.Azure.Amqp/Amqp/AmqpConstants.cs#L47
const maxAbsoluteExpiryTime = new Date("9999-12-31T07:59:59.000Z").getTime();
const aadTokenValidityMarginInMs = 5000;
const connectionReconnectDelay = 300;
const defaultMaxRetries = 3;
const defaultMaxRetriesForConnection = 150;
const defaultDelayBetweenOperationRetriesInMs = 30000;
const defaultMaxDelayForExponentialRetryInMs = 90000;
const receiverSettleMode = "receiver-settle-mode";
const dispositionStatus = "disposition-status";
const fromSequenceNumber = "from-sequence-number";
const messageCount = "message-count";
const lockTokens = "lock-tokens";
const messageIdMapKey = "message-id";
const sequenceNumberMapKey = "sequence-number";
const lockTokenMapKey = "lock-token";
const sessionIdMapKey = "session-id";
const sequenceNumbers = "sequence-numbers";
const deadLetterReason = "deadletter-reason";
const deadLetterDescription = "deadletter-description";
const propertiesToModify = "properties-to-modify";
const deadLetterName = "com.microsoft:dead-letter";
const trackingId = "com.microsoft:tracking-id";
const serverTimeout = "com.microsoft:server-timeout";
const operations = {
  putToken: "put-token",
  read: "READ",
  cancelScheduledMessage: "com.microsoft:cancel-scheduled-message",
  scheduleMessage: "com.microsoft:schedule-message",
  renewLock: "com.microsoft:renew-lock",
  peekMessage: "com.microsoft:peek-message",
  receiveBySequenceNumber: "com.microsoft:receive-by-sequence-number",
  updateDisposition: "com.microsoft:update-disposition",
  renewSessionLock: "com.microsoft:renew-session-lock",
  setSessionState: "com.microsoft:set-session-state",
  getSessionState: "com.microsoft:get-session-state",
  enumerateSessions: "com.microsoft:get-message-sessions",
  addRule: "com.microsoft:add-rule",
  removeRule: "com.microsoft:remove-rule",
  enumerateRules: "com.microsoft:enumerate-rules"
};
const descriptorCodes = {
  ruleDescriptionList: 1335734829060,
  sqlFilterList: 83483426822,
  correlationFilterList: 83483426825,
  sqlRuleActionList: 1335734829062,
  trueFilterList: 83483426823,
  falseFilterList: 83483426824
};

export const Constants = {
  associatedLinkName: associatedLinkName as typeof associatedLinkName,
  partitionKey: partitionKey as typeof partitionKey,
  sequenceNumber: sequenceNumber as typeof sequenceNumber,
  enqueueSequenceNumber: enqueueSequenceNumber as typeof enqueueSequenceNumber,
  enqueuedTime: enqueuedTime as typeof enqueuedTime,
  scheduledEnqueueTime: scheduledEnqueueTime as typeof scheduledEnqueueTime,
  offset: offset as typeof offset,
  lockedUntil: lockedUntil as typeof lockedUntil,
  partitionIdName: partitionIdName as typeof partitionIdName,
  publisher: publisher as typeof publisher,
  viaPartitionKey: viaPartitionKey as typeof viaPartitionKey,
  deadLetterSource: deadLetterSource as typeof deadLetterSource,
  enqueuedTimeAnnotation: enqueuedTimeAnnotation as typeof enqueuedTimeAnnotation,
  offsetAnnotation: offsetAnnotation as typeof offsetAnnotation,
  sequenceNumberAnnotation: sequenceNumberAnnotation as typeof sequenceNumberAnnotation,
  guidSize: guidSize as typeof guidSize,
  message: message as typeof message,
  error: error as typeof error,
  statusCode: statusCode as typeof statusCode,
  statusDescription: statusDescription as typeof statusDescription,
  errorCondition: errorCondition as typeof errorCondition,
  management: management as typeof management,
  partition: partition as typeof partition,
  partitionId: partitionId as typeof partitionId,
  readOperation: readOperation as typeof readOperation,
  TLS: TLS as typeof TLS,
  establishConnection: establishConnection as typeof establishConnection,
  defaultConsumerGroup: defaultConsumerGroup as typeof defaultConsumerGroup,
  eventHub: eventHub as typeof eventHub,
  cbsEndpoint: cbsEndpoint as typeof cbsEndpoint,
  cbsReplyTo: cbsReplyTo as typeof cbsReplyTo,
  operationPutToken: operationPutToken as typeof operationPutToken,
  aadEventHubsAudience: aadEventHubsAudience as typeof aadEventHubsAudience,
  aadEventHubsScope: aadEventHubsScope as typeof aadEventHubsScope,
  aadServiceBusAudience: aadServiceBusAudience as typeof aadServiceBusAudience,
  aadServiceBusScope: aadServiceBusScope as typeof aadServiceBusScope,
  maxUserAgentLength: maxUserAgentLength as typeof maxUserAgentLength,
  vendorString: vendorString as typeof vendorString,
  attachEpoch: attachEpoch as typeof attachEpoch,
  receiverIdentifierName: receiverIdentifierName as typeof receiverIdentifierName,
  enableReceiverRuntimeMetricName: enableReceiverRuntimeMetricName as typeof enableReceiverRuntimeMetricName,
  timespan: timespan as typeof timespan,
  uri: uri as typeof uri,
  dateTimeOffset: dateTimeOffset as typeof dateTimeOffset,
  sessionFilterName: sessionFilterName as typeof sessionFilterName,
  receiverError: receiverError as typeof receiverError,
  senderError: senderError as typeof senderError,
  sessionError: sessionError as typeof sessionError,
  connectionError: connectionError as typeof connectionError,
  defaultOperationTimeoutInMs: defaultOperationTimeoutInMs as typeof defaultOperationTimeoutInMs,
  defaultConnectionIdleTimeoutInMs: defaultConnectionIdleTimeoutInMs as typeof defaultConnectionIdleTimeoutInMs,
  managementRequestKey: managementRequestKey as typeof managementRequestKey,
  negotiateCbsKey: negotiateCbsKey as typeof negotiateCbsKey,
  negotiateClaim: negotiateClaim as typeof negotiateClaim,
  ensureContainerAndBlob: ensureContainerAndBlob as typeof ensureContainerAndBlob,
  defaultPrefetchCount: defaultPrefetchCount as typeof defaultPrefetchCount,
  reconnectLimit: reconnectLimit as typeof reconnectLimit,
  maxMessageIdLength: maxMessageIdLength as typeof maxMessageIdLength,
  maxPartitionKeyLength: maxPartitionKeyLength as typeof maxPartitionKeyLength,
  maxSessionIdLength: maxSessionIdLength as typeof maxSessionIdLength,
  pathDelimiter: pathDelimiter as typeof pathDelimiter,
  ruleNameMaximumLength: ruleNameMaximumLength as typeof ruleNameMaximumLength,
  maximumSqlFilterStatementLength: maximumSqlFilterStatementLength as typeof maximumSqlFilterStatementLength,
  maximumSqlRuleActionStatementLength: maximumSqlRuleActionStatementLength as typeof maximumSqlRuleActionStatementLength,
  maxDeadLetterReasonLength: maxDeadLetterReasonLength as typeof maxDeadLetterReasonLength,
  // https://stackoverflow.com/questions/11526504/minimum-and-maximum-date for js
  // However we are setting this to the TimeSpan.MaxValue of C#.
  maxDurationValue: maxDurationValue as typeof maxDurationValue,
  minDurationValue: minDurationValue as typeof minDurationValue,
  // https://github.com/Azure/azure-amqp/blob/master/Microsoft.Azure.Amqp/Amqp/AmqpConstants.cs#L47
  maxAbsoluteExpiryTime: maxAbsoluteExpiryTime as typeof maxAbsoluteExpiryTime,
  aadTokenValidityMarginInMs: aadTokenValidityMarginInMs as typeof aadTokenValidityMarginInMs,
  connectionReconnectDelay: connectionReconnectDelay as typeof connectionReconnectDelay,
  defaultMaxRetries: defaultMaxRetries as typeof defaultMaxRetries,
  defaultMaxRetriesForConnection: defaultMaxRetriesForConnection as typeof defaultMaxRetriesForConnection,
  defaultDelayBetweenOperationRetriesInMs: defaultDelayBetweenOperationRetriesInMs as typeof defaultDelayBetweenOperationRetriesInMs,
  defaultMaxDelayForExponentialRetryInMs: defaultMaxDelayForExponentialRetryInMs as typeof defaultMaxDelayForExponentialRetryInMs,
  receiverSettleMode: receiverSettleMode as typeof receiverSettleMode,
  dispositionStatus: dispositionStatus as typeof dispositionStatus,
  fromSequenceNumber: fromSequenceNumber as typeof fromSequenceNumber,
  messageCount: messageCount as typeof messageCount,
  lockTokens: lockTokens as typeof lockTokens,
  messageIdMapKey: messageIdMapKey as typeof messageIdMapKey,
  sequenceNumberMapKey: sequenceNumberMapKey as typeof sequenceNumberMapKey,
  lockTokenMapKey: lockTokenMapKey as typeof lockTokenMapKey,
  sessionIdMapKey: sessionIdMapKey as typeof sessionIdMapKey,
  sequenceNumbers: sequenceNumbers as typeof sequenceNumbers,
  deadLetterReason: deadLetterReason as typeof deadLetterReason,
  deadLetterDescription: deadLetterDescription as typeof deadLetterDescription,
  propertiesToModify: propertiesToModify as typeof propertiesToModify,
  deadLetterName: deadLetterName as typeof deadLetterName,
  trackingId: trackingId as typeof trackingId,
  serverTimeout: serverTimeout as typeof serverTimeout,
  operations,
  descriptorCodes
};
