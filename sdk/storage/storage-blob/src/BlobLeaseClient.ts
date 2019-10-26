// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpResponse, generateUuid } from "@azure/core-http";
import { CanonicalCode } from "@azure/core-tracing";
import { ModifiedAccessConditions, ContainerBreakLeaseOptionalParams } from "./generatedModels";
import { AbortSignalLike } from "@azure/abort-controller";
import { ContainerClient } from "./ContainerClient";
import { Blob, Container } from "./generated/src/operations";
import { StorageClientContext } from "./generated/src/storageClient";
import { BlobClient, CommonOptions } from "./internal";
import { createSpan } from "./utils/tracing";

/**
 * The details for a specific lease.
 */
export interface Lease {
  /**
   * @member {string} [etag] The ETag contains a value that you can use to
   * perform operations conditionally. If the request version is 2011-08-18 or
   * newer, the ETag value will be in quotes.
   */
  etag?: string;
  /**
   * @member {Date} [lastModified] Returns the date and time the container was
   * last modified. Any operation that modifies the blob, including an update
   * of the blob's metadata or properties, changes the last-modified time of
   * the blob.
   */
  lastModified?: Date;
  /**
   * @member {string} [leaseId] Uniquely identifies a container's lease
   */
  leaseId?: string;
  /**
   * @member {number} [leaseTime] Approximate time remaining in the lease
   * period, in seconds.
   */
  leaseTime?: number;
  /**
   * @member {string} [requestId] This header uniquely identifies the request
   * that was made and can be used for troubleshooting the request.
   */
  requestId?: string;
  /**
   * @member {string} [version] Indicates the version of the Blob service used
   * to execute the request. This header is returned for requests made against
   * version 2009-09-19 and above.
   */
  version?: string;
  /**
   * @member {Date} [date] UTC date/time value generated by the service that
   * indicates the time at which the response was initiated
   */
  date?: Date;
  /**
   * @member {string} [errorCode]
   */
  errorCode?: string;
}

/**
 * Contains the response data for operations that create, modify, or delete a lease.
 */
export type LeaseOperationResponse = Lease & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: Lease;
  };
};

/**
 * Configures lease operations.
 *
 * @export
 * @interface LeaseOperationOptions
 */
export interface LeaseOperationOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof LeaseOperationOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when changing the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof LeaseOperationOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * A client that manages leases for a ContainerClient or a BlobClient.
 *
 * @export
 * @class BlobLeaseClient
 */
export class BlobLeaseClient {
  private _leaseId: string;
  private _url: string;
  private _containerOrBlobOperation: Container | Blob;

  /**
   * Gets the lease Id.
   *
   * @readonly
   * @memberof BlobLeaseClient
   * @type {string}
   */
  public get leaseId(): string {
    return this._leaseId;
  }

  /**
   * Gets the url.
   *
   * @readonly
   * @memberof BlobLeaseClient
   * @type {string}
   */
  public get url(): string {
    return this._url;
  }

  /**
   * Creates an instance of BlobLeaseClient.
   * @param {(ContainerClient | BlobClient)} client The client to make the lease operation requests.
   * @param {string} leaseId Initial proposed lease id.
   * @memberof BlobLeaseClient
   */
  constructor(client: ContainerClient | BlobClient, leaseId?: string) {
    const clientContext = new StorageClientContext(
      client.url,
      (client as any).pipeline.toServiceClientOptions()
    );
    this._url = client.url;

    if (client instanceof ContainerClient) {
      this._containerOrBlobOperation = new Container(clientContext);
    } else {
      this._containerOrBlobOperation = new Blob(clientContext);
    }

    if (!leaseId) {
      leaseId = generateUuid();
    }
    this._leaseId = leaseId;
  }

  /**
   * Establishes and manages a lock on a container for delete operations, or on a blob
   * for write and delete operations.
   * The lock duration can be 15 to 60 seconds, or can be infinite.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {number} duration Must be between 15 to 60 seconds, or infinite (-1)
   * @param {LeaseOperationOptions} [options={}] option to configure lease management operations.
   * @returns {Promise<LeaseOperationResponse>} Response data for acquire lease operation.
   * @memberof BlobLeaseClient
   */
  public async acquireLease(
    duration: number,
    options: LeaseOperationOptions = {}
  ): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan("BlobLeaseClient-acquireLease", options.spanOptions);
    try {
      return await this._containerOrBlobOperation.acquireLease({
        abortSignal: options.abortSignal,
        duration,
        modifiedAccessConditions: options.conditions,
        proposedLeaseId: this._leaseId,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * To change the ID of the lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {string} proposedLeaseId the proposed new lease Id.
   * @param {LeaseOperationOptions} [options={}] option to configure lease management operations.
   * @returns {Promise<LeaseOperationResponse>} Response data for change lease operation.
   * @memberof BlobLeaseClient
   */
  public async changeLease(
    proposedLeaseId: string,
    options: LeaseOperationOptions = {}
  ): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan("BlobLeaseClient-changeLease", options.spanOptions);
    try {
      const response = await this._containerOrBlobOperation.changeLease(
        this._leaseId,
        proposedLeaseId,
        {
          abortSignal: options.abortSignal,
          modifiedAccessConditions: options.conditions,
          spanOptions
        }
      );
      this._leaseId = proposedLeaseId;
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * To free the lease if it is no longer needed so that another client may
   * immediately acquire a lease against the container or the blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {LeaseOperationOptions} [options={}] option to configure lease management operations.
   * @returns {Promise<LeaseOperationResponse>} Response data for release lease operation.
   * @memberof BlobLeaseClient
   */
  public async releaseLease(options: LeaseOperationOptions = {}): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan("BlobLeaseClient-releaseLease", options.spanOptions);
    try {
      return await this._containerOrBlobOperation.releaseLease(this._leaseId, {
        abortSignal: options.abortSignal,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * To renew the lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {LeaseOperationOptions} [options={}] Optional option to configure lease management operations.
   * @returns {Promise<LeaseOperationResponse>} Response data for renew lease operation.
   * @memberof BlobLeaseClient
   */
  public async renewLease(options: LeaseOperationOptions = {}): Promise<Lease> {
    const { span, spanOptions } = createSpan("BlobLeaseClient-renewLease", options.spanOptions);
    try {
      return await this._containerOrBlobOperation.renewLease(this._leaseId, {
        abortSignal: options.abortSignal,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * To end the lease but ensure that another client cannot acquire a new lease
   * until the current lease period has expired.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @static
   * @param {number} breakPeriod Break period
   * @param {LeaseOperationOptions} [options={}] Optional options to configure lease management operations.
   * @returns {Promise<LeaseOperationResponse>} Response data for break lease operation.
   * @memberof BlobLeaseClient
   */
  public async breakLease(
    breakPeriod: number,
    options: LeaseOperationOptions = {}
  ): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan("BlobLeaseClient-breakLease", options.spanOptions);
    try {
      const operationOptions: ContainerBreakLeaseOptionalParams = {
        abortSignal: options.abortSignal,
        breakPeriod,
        modifiedAccessConditions: options.conditions,
        spanOptions
      };
      return await this._containerOrBlobOperation.breakLease(operationOptions);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
