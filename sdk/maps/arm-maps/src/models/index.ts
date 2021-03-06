/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { BaseResource, CloudError, AzureServiceClientOptions } from "@azure/ms-rest-azure-js";
import * as msRest from "@azure/ms-rest-js";

export { BaseResource, CloudError };

/**
 * Creator resource properties
 */
export interface CreatorProperties {
  /**
   * The state of the resource provisioning, terminal states: Succeeded, Failed, Canceled
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningState?: string;
  /**
   * The storage units to be allocated. Integer values from 1 to 100, inclusive.
   */
  storageUnits: number;
}

/**
 * An Azure resource which represents Maps Creator product and provides ability to manage private
 * location data.
 */
export interface Creator extends BaseResource {
  /**
   * The Creator resource properties.
   */
  properties: CreatorProperties;
}

/**
 * The SKU of the Maps Account.
 */
export interface Sku {
  /**
   * The name of the SKU, in standard format (such as S0). Possible values include: 'S0', 'S1',
   * 'G2'
   */
  name: Name;
  /**
   * Gets the sku tier. This is based on the SKU name.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly tier?: string;
}

/**
 * Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemData {
  /**
   * The identity that created the resource.
   */
  createdBy?: string;
  /**
   * The type of identity that created the resource. Possible values include: 'User',
   * 'Application', 'ManagedIdentity', 'Key'
   */
  createdByType?: CreatedByType;
  /**
   * The timestamp of resource creation (UTC).
   */
  createdAt?: Date;
  /**
   * The identity that last modified the resource.
   */
  lastModifiedBy?: string;
  /**
   * The type of identity that last modified the resource. Possible values include: 'User',
   * 'Application', 'ManagedIdentity', 'Key'
   */
  lastModifiedByType?: CreatedByType;
  /**
   * The timestamp of resource last modification (UTC)
   */
  lastModifiedAt?: Date;
}

/**
 * Additional Map account properties
 */
export interface MapsAccountProperties {
  /**
   * A unique identifier for the maps account
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly uniqueId?: string;
  /**
   * Allows toggle functionality on Azure Policy to disable Azure Maps local authentication
   * support. This will disable Shared Keys authentication from any usage. Default value: false.
   */
  disableLocalAuth?: boolean;
  /**
   * the state of the provisioning.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningState?: string;
}

/**
 * An Azure resource which represents access to a suite of Maps REST APIs.
 */
export interface MapsAccount extends BaseResource {
  /**
   * The SKU of this account.
   */
  sku: Sku;
  /**
   * Get or Set Kind property. Possible values include: 'Gen1', 'Gen2'. Default value: 'Gen1'.
   */
  kind?: Kind;
  /**
   * The system meta data relating to this resource.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly systemData?: SystemData;
  /**
   * The map account properties.
   */
  properties?: MapsAccountProperties;
}

/**
 * Parameters used to update an existing Maps Account.
 */
export interface MapsAccountUpdateParameters {
  /**
   * Gets or sets a list of key value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters.
   */
  tags?: { [propertyName: string]: string };
  /**
   * Get or Set Kind property. Possible values include: 'Gen1', 'Gen2'. Default value: 'Gen1'.
   */
  kind?: Kind;
  /**
   * The SKU of this account.
   */
  sku?: Sku;
  /**
   * A unique identifier for the maps account
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly uniqueId?: string;
  /**
   * Allows toggle functionality on Azure Policy to disable Azure Maps local authentication
   * support. This will disable Shared Keys authentication from any usage. Default value: false.
   */
  disableLocalAuth?: boolean;
  /**
   * the state of the provisioning.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningState?: string;
}

/**
 * Parameters used to update an existing Creator resource.
 */
export interface CreatorUpdateParameters {
  /**
   * Gets or sets a list of key value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters.
   */
  tags?: { [propertyName: string]: string };
  /**
   * The state of the resource provisioning, terminal states: Succeeded, Failed, Canceled
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningState?: string;
  /**
   * The storage units to be allocated. Integer values from 1 to 100, inclusive.
   */
  storageUnits: number;
}

/**
 * Whether the operation refers to the primary or secondary key.
 */
export interface MapsKeySpecification {
  /**
   * Whether the operation refers to the primary or secondary key. Possible values include:
   * 'primary', 'secondary'
   */
  keyType: KeyType;
}

/**
 * The set of keys which can be used to access the Maps REST APIs. Two keys are provided for key
 * rotation without interruption.
 */
export interface MapsAccountKeys {
  /**
   * The last updated date and time of the primary key.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly primaryKeyLastUpdated?: string;
  /**
   * The primary key for accessing the Maps REST APIs.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly primaryKey?: string;
  /**
   * The secondary key for accessing the Maps REST APIs.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly secondaryKey?: string;
  /**
   * The last updated date and time of the secondary key.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly secondaryKeyLastUpdated?: string;
}

/**
 * Operation display payload
 */
export interface OperationDisplay {
  /**
   * Resource provider of the operation
   */
  provider?: string;
  /**
   * Resource of the operation
   */
  resource?: string;
  /**
   * Localized friendly name for the operation
   */
  operation?: string;
  /**
   * Localized friendly description for the operation
   */
  description?: string;
}

/**
 * Dimension of map account, for example API Category, Api Name, Result Type, and Response Code.
 */
export interface Dimension {
  /**
   * Display name of dimension.
   */
  name?: string;
  /**
   * Display name of dimension.
   */
  displayName?: string;
}

/**
 * Metric specification of operation.
 */
export interface MetricSpecification {
  /**
   * Name of metric specification.
   */
  name?: string;
  /**
   * Display name of metric specification.
   */
  displayName?: string;
  /**
   * Display description of metric specification.
   */
  displayDescription?: string;
  /**
   * Unit could be Count.
   */
  unit?: string;
  /**
   * Dimensions of map account.
   */
  dimensions?: Dimension[];
  /**
   * Aggregation type could be Average.
   */
  aggregationType?: string;
  /**
   * The property to decide fill gap with zero or not.
   */
  fillGapWithZero?: boolean;
  /**
   * The category this metric specification belong to, could be Capacity.
   */
  category?: string;
  /**
   * Account Resource Id.
   */
  resourceIdDimensionNameOverride?: string;
}

/**
 * One property of operation, include metric specifications.
 */
export interface ServiceSpecification {
  /**
   * Metric specifications of operation.
   */
  metricSpecifications?: MetricSpecification[];
}

/**
 * Operation detail payload
 */
export interface OperationDetail {
  /**
   * Name of the operation
   */
  name?: string;
  /**
   * Indicates whether the operation is a data action
   */
  isDataAction?: boolean;
  /**
   * Display of the operation
   */
  display?: OperationDisplay;
  /**
   * Origin of the operation
   */
  origin?: string;
  /**
   * One property of operation, include metric specifications.
   */
  serviceSpecification?: ServiceSpecification;
}

/**
 * Common fields that are returned in the response for all Azure Resource Manager resources
 * @summary Resource
 */
export interface Resource extends BaseResource {
  /**
   * Fully qualified resource ID for the resource. Ex -
   * /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * The name of the resource
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or
   * "Microsoft.Storage/storageAccounts"
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
}

/**
 * The resource model definition for a Azure Resource Manager proxy resource. It will not have tags
 * and a location
 * @summary Proxy Resource
 */
export interface ProxyResource extends Resource {}

/**
 * The resource model definition for an Azure Resource Manager resource with an etag.
 * @summary Entity Resource
 */
export interface AzureEntityResource extends Resource {
  /**
   * Resource Etag.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly etag?: string;
}

/**
 * The resource model definition for an Azure Resource Manager tracked top level resource which has
 * 'tags' and a 'location'
 * @summary Tracked Resource
 */
export interface TrackedResource extends Resource {
  /**
   * Resource tags.
   */
  tags?: { [propertyName: string]: string };
  /**
   * The geo-location where the resource lives
   */
  location: string;
}

/**
 * The resource management error additional info.
 */
export interface ErrorAdditionalInfo {
  /**
   * The additional info type.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
  /**
   * The additional info.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly info?: any;
}

/**
 * The error detail.
 */
export interface ErrorDetail {
  /**
   * The error code.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly code?: string;
  /**
   * The error message.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly message?: string;
  /**
   * The error target.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly target?: string;
  /**
   * The error details.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly details?: ErrorDetail[];
  /**
   * The error additional info.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

/**
 * Common error response for all Azure Resource Manager APIs to return error details for failed
 * operations. (This also follows the OData error response format.).
 * @summary Error response
 */
export interface ErrorResponse {
  /**
   * The error object.
   */
  error?: ErrorDetail;
}

/**
 * An interface representing AzureMapsManagementClientOptions.
 */
export interface AzureMapsManagementClientOptions extends AzureServiceClientOptions {
  baseUri?: string;
}

/**
 * @interface
 * A list of Maps Accounts.
 * @extends Array<MapsAccount>
 */
export interface MapsAccounts extends Array<MapsAccount> {
  /**
   * URL client should use to fetch the next page (per server side paging).
   * It's null for now, added for future use.
   */
  nextLink?: string;
}

/**
 * @interface
 * The set of operations available for Maps.
 * @extends Array<OperationDetail>
 */
export interface MapsOperations extends Array<OperationDetail> {
  /**
   * URL client should use to fetch the next page (per server side paging).
   * It's null for now, added for future use.
   */
  nextLink?: string;
}

/**
 * @interface
 * A list of Creator resources.
 * @extends Array<Creator>
 */
export interface CreatorList extends Array<Creator> {
  /**
   * URL client should use to fetch the next page (per server side paging).
   * It's null for now, added for future use.
   */
  nextLink?: string;
}

/**
 * Defines values for Name.
 * Possible values include: 'S0', 'S1', 'G2'
 * @readonly
 * @enum {string}
 */
export type Name = "S0" | "S1" | "G2";

/**
 * Defines values for Kind.
 * Possible values include: 'Gen1', 'Gen2'
 * @readonly
 * @enum {string}
 */
export type Kind = "Gen1" | "Gen2";

/**
 * Defines values for CreatedByType.
 * Possible values include: 'User', 'Application', 'ManagedIdentity', 'Key'
 * @readonly
 * @enum {string}
 */
export type CreatedByType = "User" | "Application" | "ManagedIdentity" | "Key";

/**
 * Defines values for KeyType.
 * Possible values include: 'primary', 'secondary'
 * @readonly
 * @enum {string}
 */
export type KeyType = "primary" | "secondary";

/**
 * Contains response data for the createOrUpdate operation.
 */
export type AccountsCreateOrUpdateResponse = MapsAccount & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccount;
  };
};

/**
 * Contains response data for the update operation.
 */
export type AccountsUpdateResponse = MapsAccount & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccount;
  };
};

/**
 * Contains response data for the get operation.
 */
export type AccountsGetResponse = MapsAccount & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccount;
  };
};

/**
 * Contains response data for the listByResourceGroup operation.
 */
export type AccountsListByResourceGroupResponse = MapsAccounts & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccounts;
  };
};

/**
 * Contains response data for the listBySubscription operation.
 */
export type AccountsListBySubscriptionResponse = MapsAccounts & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccounts;
  };
};

/**
 * Contains response data for the listKeys operation.
 */
export type AccountsListKeysResponse = MapsAccountKeys & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccountKeys;
  };
};

/**
 * Contains response data for the regenerateKeys operation.
 */
export type AccountsRegenerateKeysResponse = MapsAccountKeys & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccountKeys;
  };
};

/**
 * Contains response data for the listByResourceGroupNext operation.
 */
export type AccountsListByResourceGroupNextResponse = MapsAccounts & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccounts;
  };
};

/**
 * Contains response data for the listBySubscriptionNext operation.
 */
export type AccountsListBySubscriptionNextResponse = MapsAccounts & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccounts;
  };
};

/**
 * Contains response data for the listOperations operation.
 */
export type MapsListOperationsResponse = MapsOperations & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsOperations;
  };
};

/**
 * Contains response data for the listOperationsNext operation.
 */
export type MapsListOperationsNextResponse = MapsOperations & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsOperations;
  };
};

/**
 * Contains response data for the listByAccount operation.
 */
export type CreatorsListByAccountResponse = CreatorList & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: CreatorList;
  };
};

/**
 * Contains response data for the createOrUpdate operation.
 */
export type CreatorsCreateOrUpdateResponse = Creator & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Creator;
  };
};

/**
 * Contains response data for the update operation.
 */
export type CreatorsUpdateResponse = Creator & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Creator;
  };
};

/**
 * Contains response data for the get operation.
 */
export type CreatorsGetResponse = Creator & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Creator;
  };
};

/**
 * Contains response data for the listByAccountNext operation.
 */
export type CreatorsListByAccountNextResponse = CreatorList & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: CreatorList;
  };
};
