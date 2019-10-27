// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import {
  RetryPolicy as StorageQueueRetryPolicy,
  RetryPolicyType as StorageQueueRetryPolicyType
} from "./policies/RetryPolicy";

export {
  RetryPolicyType as StorageQueueRetryPolicyType,
  RetryPolicy as StorageQueueRetryPolicy
} from "./policies/RetryPolicy";

/**
 * Retry options interface.
 *
 * @export
 * @interface RetryOptions
 */
export interface StorageQueueRetryOptions {
  /**
   * Optional. RetryPolicyType, default is exponential retry policy.
   *
   * @type {RetryPolicyType}
   * @memberof RetryOptions
   */
  readonly retryPolicyType?: StorageQueueRetryPolicyType;

  /**
   * Optional. Max try number of attempts, default is 4.
   * A value of 1 means 1 try and no retries.
   * A value smaller than 1 means default retry number of attempts.
   *
   * @type {number}
   * @memberof RetryOptions
   */
  readonly maxTries?: number;

  /**
   * Optional. Indicates the maximum time in ms allowed for any single try of an HTTP request.
   * A value of zero or undefined means that you accept our default timeout, 30s or 30 * 1000ms.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations
   *
   * @type {number}
   * @memberof RetryOptions
   */
  readonly tryTimeoutInMs?: number;

  /**
   * Optional. Specifies the amount of delay to use before retrying an operation (default is 4s or 4 * 1000ms).
   * The delay increases (exponentially or linearly) with each retry up to a maximum specified by
   * maxRetryDelayInMs. If you specify 0, then you must also specify 0 for maxRetryDelayInMs.
   *
   * @type {number}
   * @memberof RetryOptions
   */
  readonly retryDelayInMs?: number;

  /**
   * Optional. Specifies the maximum delay allowed before retrying an operation (default is 120s or 120 * 1000ms).
   * If you specify 0, then you must also specify 0 for retryDelayInMs.
   *
   * @type {number}
   * @memberof RetryOptions
   */
  readonly maxRetryDelayInMs?: number;

  /**
   * If a secondaryHost is specified, retries will be tried against this host. If secondaryHost is undefined
   * (the default) then operations are not retried against another host.
   *
   * NOTE: Before setting this field, make sure you understand the issues around
   * reading stale and potentially-inconsistent data at
   * {@link https://docs.microsoft.com/en-us/azure/storage/common/storage-designing-ha-apps-with-ragrs}
   *
   * @type {string}
   * @memberof RetryOptions
   */
  readonly secondaryHost?: string;
}

/**
 * RetryPolicyFactory is a factory class helping generating RetryPolicy objects.
 *
 * @export
 * @class RetryPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class StorageQueueRetryPolicyFactory implements RequestPolicyFactory {
  private retryOptions?: StorageQueueRetryOptions;

  /**
   * Creates an instance of RetryPolicyFactory.
   * @param {RetryOptions} [retryOptions]
   * @memberof RetryPolicyFactory
   */
  constructor(retryOptions?: StorageQueueRetryOptions) {
    this.retryOptions = retryOptions;
  }

  /**
   * Creates a RetryPolicy object.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {RetryPolicy}
   * @memberof RetryPolicyFactory
   */
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageQueueRetryPolicy {
    return new StorageQueueRetryPolicy(nextPolicy, options, this.retryOptions);
  }
}
