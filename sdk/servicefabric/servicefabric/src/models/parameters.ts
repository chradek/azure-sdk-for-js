/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";

export const apiVersion0: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "api-version",
    defaultValue: '6.0',
    type: {
      name: "String"
    }
  }
};
export const apiVersion1: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "api-version",
    defaultValue: '6.4',
    type: {
      name: "String"
    }
  }
};
export const apiVersion2: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "api-version",
    defaultValue: '6.3',
    type: {
      name: "String"
    }
  }
};
export const apiVersion3: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "api-version",
    defaultValue: '6.2',
    type: {
      name: "String"
    }
  }
};
export const apiVersion4: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "api-version",
    defaultValue: '6.1',
    type: {
      name: "String"
    }
  }
};
export const apiVersion5: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "api-version",
    defaultValue: '6.5',
    type: {
      name: "String"
    }
  }
};
export const apiVersion6: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "api-version",
    defaultValue: '6.0-preview',
    type: {
      name: "String"
    }
  }
};
export const apiVersion7: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "api-version",
    defaultValue: '6.4-preview',
    type: {
      name: "String"
    }
  }
};
export const apiVersion8: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "api-version",
    defaultValue: '6.2-preview',
    type: {
      name: "String"
    }
  }
};
export const applicationDefinitionKindFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "applicationDefinitionKindFilter"
  ],
  mapper: {
    serializedName: "ApplicationDefinitionKindFilter",
    defaultValue: 0,
    type: {
      name: "Number"
    }
  }
};
export const applicationId: msRest.OperationURLParameter = {
  parameterPath: "applicationId",
  mapper: {
    required: true,
    serializedName: "applicationId",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const applicationResourceName: msRest.OperationURLParameter = {
  parameterPath: "applicationResourceName",
  mapper: {
    required: true,
    serializedName: "applicationResourceName",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const applicationsHealthStateFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "applicationsHealthStateFilter"
  ],
  mapper: {
    serializedName: "ApplicationsHealthStateFilter",
    defaultValue: 0,
    type: {
      name: "Number"
    }
  }
};
export const applicationTypeDefinitionKindFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "applicationTypeDefinitionKindFilter"
  ],
  mapper: {
    serializedName: "ApplicationTypeDefinitionKindFilter",
    defaultValue: 0,
    type: {
      name: "Number"
    }
  }
};
export const applicationTypeName0: msRest.OperationURLParameter = {
  parameterPath: "applicationTypeName",
  mapper: {
    required: true,
    serializedName: "applicationTypeName",
    type: {
      name: "String"
    }
  }
};
export const applicationTypeName1: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "applicationTypeName"
  ],
  mapper: {
    serializedName: "ApplicationTypeName",
    type: {
      name: "String"
    }
  }
};
export const applicationTypeVersion0: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "applicationTypeVersion"
  ],
  mapper: {
    serializedName: "ApplicationTypeVersion",
    type: {
      name: "String"
    }
  }
};
export const applicationTypeVersion1: msRest.OperationQueryParameter = {
  parameterPath: "applicationTypeVersion",
  mapper: {
    required: true,
    serializedName: "ApplicationTypeVersion",
    type: {
      name: "String"
    }
  }
};
export const backupPolicyName: msRest.OperationURLParameter = {
  parameterPath: "backupPolicyName",
  mapper: {
    required: true,
    serializedName: "backupPolicyName",
    type: {
      name: "String"
    }
  }
};
export const backupTimeout: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "backupTimeout"
  ],
  mapper: {
    serializedName: "BackupTimeout",
    defaultValue: 10,
    type: {
      name: "Number"
    }
  }
};
export const codePackageInstanceId: msRest.OperationQueryParameter = {
  parameterPath: "codePackageInstanceId",
  mapper: {
    required: true,
    serializedName: "CodePackageInstanceId",
    type: {
      name: "String"
    }
  }
};
export const codePackageName0: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "codePackageName"
  ],
  mapper: {
    serializedName: "CodePackageName",
    type: {
      name: "String"
    }
  }
};
export const codePackageName1: msRest.OperationQueryParameter = {
  parameterPath: "codePackageName",
  mapper: {
    required: true,
    serializedName: "CodePackageName",
    type: {
      name: "String"
    }
  }
};
export const codePackageName2: msRest.OperationURLParameter = {
  parameterPath: "codePackageName",
  mapper: {
    required: true,
    serializedName: "codePackageName",
    type: {
      name: "String"
    }
  }
};
export const codeVersion: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "codeVersion"
  ],
  mapper: {
    serializedName: "CodeVersion",
    type: {
      name: "String"
    }
  }
};
export const command: msRest.OperationQueryParameter = {
  parameterPath: "command",
  mapper: {
    required: true,
    serializedName: "Command",
    type: {
      name: "String"
    }
  }
};
export const configurationApiVersion: msRest.OperationQueryParameter = {
  parameterPath: "configurationApiVersion",
  mapper: {
    required: true,
    serializedName: "ConfigurationApiVersion",
    type: {
      name: "String"
    }
  }
};
export const configVersion: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "configVersion"
  ],
  mapper: {
    serializedName: "ConfigVersion",
    type: {
      name: "String"
    }
  }
};
export const contentPath: msRest.OperationURLParameter = {
  parameterPath: "contentPath",
  mapper: {
    required: true,
    serializedName: "contentPath",
    type: {
      name: "String"
    }
  }
};
export const contentRange: msRest.OperationParameter = {
  parameterPath: "contentRange",
  mapper: {
    required: true,
    serializedName: "Content-Range",
    type: {
      name: "String"
    }
  }
};
export const continuationToken: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "continuationToken"
  ],
  mapper: {
    serializedName: "ContinuationToken",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const currentNodeName: msRest.OperationQueryParameter = {
  parameterPath: "currentNodeName",
  mapper: {
    required: true,
    serializedName: "CurrentNodeName",
    type: {
      name: "String"
    }
  }
};
export const dataLossMode: msRest.OperationQueryParameter = {
  parameterPath: "dataLossMode",
  mapper: {
    required: true,
    serializedName: "DataLossMode",
    type: {
      name: "String"
    }
  }
};
export const deployedApplicationsHealthStateFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "deployedApplicationsHealthStateFilter"
  ],
  mapper: {
    serializedName: "DeployedApplicationsHealthStateFilter",
    defaultValue: 0,
    type: {
      name: "Number"
    }
  }
};
export const deployedServicePackagesHealthStateFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "deployedServicePackagesHealthStateFilter"
  ],
  mapper: {
    serializedName: "DeployedServicePackagesHealthStateFilter",
    defaultValue: 0,
    type: {
      name: "Number"
    }
  }
};
export const deploymentName: msRest.OperationURLParameter = {
  parameterPath: "deploymentName",
  mapper: {
    required: true,
    serializedName: "deploymentName",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const enabled: msRest.OperationQueryParameter = {
  parameterPath: "enabled",
  mapper: {
    required: true,
    serializedName: "Enabled",
    type: {
      name: "Boolean"
    }
  }
};
export const endDateTimeFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "endDateTimeFilter"
  ],
  mapper: {
    serializedName: "EndDateTimeFilter",
    type: {
      name: "DateTime"
    }
  }
};
export const endTimeUtc0: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "endTimeUtc"
  ],
  mapper: {
    serializedName: "EndTimeUtc",
    type: {
      name: "String"
    }
  }
};
export const endTimeUtc1: msRest.OperationQueryParameter = {
  parameterPath: "endTimeUtc",
  mapper: {
    required: true,
    serializedName: "EndTimeUtc",
    type: {
      name: "String"
    }
  }
};
export const eventInstanceId: msRest.OperationURLParameter = {
  parameterPath: "eventInstanceId",
  mapper: {
    required: true,
    serializedName: "eventInstanceId",
    type: {
      name: "String"
    }
  }
};
export const eventsHealthStateFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "eventsHealthStateFilter"
  ],
  mapper: {
    serializedName: "EventsHealthStateFilter",
    defaultValue: 0,
    type: {
      name: "Number"
    }
  }
};
export const eventsTypesFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "eventsTypesFilter"
  ],
  mapper: {
    serializedName: "EventsTypesFilter",
    type: {
      name: "String"
    }
  }
};
export const excludeAnalysisEvents: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "excludeAnalysisEvents"
  ],
  mapper: {
    serializedName: "ExcludeAnalysisEvents",
    type: {
      name: "Boolean"
    }
  }
};
export const excludeApplicationParameters: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "excludeApplicationParameters"
  ],
  mapper: {
    serializedName: "ExcludeApplicationParameters",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const excludeHealthStatistics: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "excludeHealthStatistics"
  ],
  mapper: {
    serializedName: "ExcludeHealthStatistics",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const executorFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "executorFilter"
  ],
  mapper: {
    serializedName: "ExecutorFilter",
    type: {
      name: "String"
    }
  }
};
export const force: msRest.OperationQueryParameter = {
  parameterPath: "force",
  mapper: {
    required: true,
    serializedName: "Force",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const forceRemove: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "forceRemove"
  ],
  mapper: {
    serializedName: "ForceRemove",
    type: {
      name: "Boolean"
    }
  }
};
export const gatewayResourceName: msRest.OperationURLParameter = {
  parameterPath: "gatewayResourceName",
  mapper: {
    required: true,
    serializedName: "gatewayResourceName",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const ignoreConstraints: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "ignoreConstraints"
  ],
  mapper: {
    serializedName: "IgnoreConstraints",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const immediate: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "immediate"
  ],
  mapper: {
    serializedName: "Immediate",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const includeHealthState: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "includeHealthState"
  ],
  mapper: {
    serializedName: "IncludeHealthState",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const includeSystemApplicationHealthStatistics: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "includeSystemApplicationHealthStatistics"
  ],
  mapper: {
    serializedName: "IncludeSystemApplicationHealthStatistics",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const includeValues: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "includeValues"
  ],
  mapper: {
    serializedName: "IncludeValues",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const latest: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "latest"
  ],
  mapper: {
    serializedName: "Latest",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const maxResults: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "maxResults"
  ],
  mapper: {
    serializedName: "MaxResults",
    defaultValue: 0,
    constraints: {
      InclusiveMinimum: 0
    },
    type: {
      name: "Number"
    }
  }
};
export const nameId: msRest.OperationURLParameter = {
  parameterPath: "nameId",
  mapper: {
    required: true,
    serializedName: "nameId",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const networkResourceName: msRest.OperationURLParameter = {
  parameterPath: "networkResourceName",
  mapper: {
    required: true,
    serializedName: "networkResourceName",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const newNodeName: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "newNodeName"
  ],
  mapper: {
    serializedName: "NewNodeName",
    type: {
      name: "String"
    }
  }
};
export const nodeInstanceId: msRest.OperationQueryParameter = {
  parameterPath: "nodeInstanceId",
  mapper: {
    required: true,
    serializedName: "NodeInstanceId",
    type: {
      name: "String"
    }
  }
};
export const nodeName0: msRest.OperationURLParameter = {
  parameterPath: "nodeName",
  mapper: {
    required: true,
    serializedName: "nodeName",
    type: {
      name: "String"
    }
  }
};
export const nodeName1: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "nodeName"
  ],
  mapper: {
    serializedName: "NodeName",
    type: {
      name: "String"
    }
  }
};
export const nodesHealthStateFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "nodesHealthStateFilter"
  ],
  mapper: {
    serializedName: "NodesHealthStateFilter",
    defaultValue: 0,
    type: {
      name: "Number"
    }
  }
};
export const nodeStatusFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "nodeStatusFilter"
  ],
  mapper: {
    serializedName: "NodeStatusFilter",
    defaultValue: 'default',
    type: {
      name: "String"
    }
  }
};
export const nodeTransitionType: msRest.OperationQueryParameter = {
  parameterPath: "nodeTransitionType",
  mapper: {
    required: true,
    serializedName: "NodeTransitionType",
    type: {
      name: "String"
    }
  }
};
export const onlyQueryPrimaries: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "onlyQueryPrimaries"
  ],
  mapper: {
    serializedName: "OnlyQueryPrimaries",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const operationId: msRest.OperationQueryParameter = {
  parameterPath: "operationId",
  mapper: {
    required: true,
    serializedName: "OperationId",
    type: {
      name: "Uuid"
    }
  }
};
export const partitionId0: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "partitionId"
  ],
  mapper: {
    serializedName: "PartitionId",
    type: {
      name: "Uuid"
    }
  }
};
export const partitionId1: msRest.OperationURLParameter = {
  parameterPath: "partitionId",
  mapper: {
    required: true,
    serializedName: "partitionId",
    type: {
      name: "Uuid"
    }
  },
  skipEncoding: true
};
export const partitionKeyType: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "partitionKeyType"
  ],
  mapper: {
    serializedName: "PartitionKeyType",
    type: {
      name: "Number"
    }
  }
};
export const partitionKeyValue: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "partitionKeyValue"
  ],
  mapper: {
    serializedName: "PartitionKeyValue",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const partitionsHealthStateFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "partitionsHealthStateFilter"
  ],
  mapper: {
    serializedName: "PartitionsHealthStateFilter",
    defaultValue: 0,
    type: {
      name: "Number"
    }
  }
};
export const previous: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "previous"
  ],
  mapper: {
    serializedName: "Previous",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const previousRspVersion: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "previousRspVersion"
  ],
  mapper: {
    serializedName: "PreviousRspVersion",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const propertyName: msRest.OperationQueryParameter = {
  parameterPath: "propertyName",
  mapper: {
    required: true,
    serializedName: "PropertyName",
    type: {
      name: "String"
    }
  }
};
export const quorumLossDuration: msRest.OperationQueryParameter = {
  parameterPath: "quorumLossDuration",
  mapper: {
    required: true,
    serializedName: "QuorumLossDuration",
    type: {
      name: "Number"
    }
  }
};
export const quorumLossMode: msRest.OperationQueryParameter = {
  parameterPath: "quorumLossMode",
  mapper: {
    required: true,
    serializedName: "QuorumLossMode",
    type: {
      name: "String"
    }
  }
};
export const recursive: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "recursive"
  ],
  mapper: {
    serializedName: "Recursive",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const replicaId: msRest.OperationURLParameter = {
  parameterPath: "replicaId",
  mapper: {
    required: true,
    serializedName: "replicaId",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const replicaName: msRest.OperationURLParameter = {
  parameterPath: "replicaName",
  mapper: {
    required: true,
    serializedName: "replicaName",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const replicasHealthStateFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "replicasHealthStateFilter"
  ],
  mapper: {
    serializedName: "ReplicasHealthStateFilter",
    defaultValue: 0,
    type: {
      name: "Number"
    }
  }
};
export const restartPartitionMode: msRest.OperationQueryParameter = {
  parameterPath: "restartPartitionMode",
  mapper: {
    required: true,
    serializedName: "RestartPartitionMode",
    type: {
      name: "String"
    }
  }
};
export const restoreTimeout: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "restoreTimeout"
  ],
  mapper: {
    serializedName: "RestoreTimeout",
    defaultValue: 10,
    type: {
      name: "Number"
    }
  }
};
export const secretResourceName: msRest.OperationURLParameter = {
  parameterPath: "secretResourceName",
  mapper: {
    required: true,
    serializedName: "secretResourceName",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const secretValueResourceName: msRest.OperationURLParameter = {
  parameterPath: "secretValueResourceName",
  mapper: {
    required: true,
    serializedName: "secretValueResourceName",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const serviceId0: msRest.OperationURLParameter = {
  parameterPath: "serviceId",
  mapper: {
    required: true,
    serializedName: "serviceId",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const serviceId1: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "serviceId"
  ],
  mapper: {
    serializedName: "ServiceId",
    type: {
      name: "String"
    }
  }
};
export const serviceKind: msRest.OperationQueryParameter = {
  parameterPath: "serviceKind",
  mapper: {
    required: true,
    serializedName: "ServiceKind",
    defaultValue: 'Stateful',
    type: {
      name: "String"
    }
  }
};
export const serviceManifestName0: msRest.OperationQueryParameter = {
  parameterPath: "serviceManifestName",
  mapper: {
    required: true,
    serializedName: "ServiceManifestName",
    type: {
      name: "String"
    }
  }
};
export const serviceManifestName1: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "serviceManifestName"
  ],
  mapper: {
    serializedName: "ServiceManifestName",
    type: {
      name: "String"
    }
  }
};
export const servicePackageName: msRest.OperationURLParameter = {
  parameterPath: "servicePackageName",
  mapper: {
    required: true,
    serializedName: "servicePackageName",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const serviceResourceName: msRest.OperationURLParameter = {
  parameterPath: "serviceResourceName",
  mapper: {
    required: true,
    serializedName: "serviceResourceName",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const servicesHealthStateFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "servicesHealthStateFilter"
  ],
  mapper: {
    serializedName: "ServicesHealthStateFilter",
    defaultValue: 0,
    type: {
      name: "Number"
    }
  }
};
export const serviceTypeName0: msRest.OperationURLParameter = {
  parameterPath: "serviceTypeName",
  mapper: {
    required: true,
    serializedName: "serviceTypeName",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const serviceTypeName1: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "serviceTypeName"
  ],
  mapper: {
    serializedName: "ServiceTypeName",
    type: {
      name: "String"
    }
  }
};
export const sessionId: msRest.OperationQueryParameter = {
  parameterPath: "sessionId",
  mapper: {
    required: true,
    serializedName: "session-id",
    type: {
      name: "Uuid"
    }
  }
};
export const skipCorrelationLookup: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "skipCorrelationLookup"
  ],
  mapper: {
    serializedName: "SkipCorrelationLookup",
    type: {
      name: "Boolean"
    }
  }
};
export const startDateTimeFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "startDateTimeFilter"
  ],
  mapper: {
    serializedName: "StartDateTimeFilter",
    type: {
      name: "DateTime"
    }
  }
};
export const startTimeUtc0: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "startTimeUtc"
  ],
  mapper: {
    serializedName: "StartTimeUtc",
    type: {
      name: "String"
    }
  }
};
export const startTimeUtc1: msRest.OperationQueryParameter = {
  parameterPath: "startTimeUtc",
  mapper: {
    required: true,
    serializedName: "StartTimeUtc",
    type: {
      name: "String"
    }
  }
};
export const stateFilter0: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "stateFilter"
  ],
  mapper: {
    serializedName: "StateFilter",
    type: {
      name: "Number"
    }
  }
};
export const stateFilter1: msRest.OperationQueryParameter = {
  parameterPath: "stateFilter",
  mapper: {
    required: true,
    serializedName: "StateFilter",
    defaultValue: 65535,
    type: {
      name: "Number"
    }
  }
};
export const stopDurationInSeconds: msRest.OperationQueryParameter = {
  parameterPath: "stopDurationInSeconds",
  mapper: {
    required: true,
    serializedName: "StopDurationInSeconds",
    constraints: {
      InclusiveMinimum: 0
    },
    type: {
      name: "Number"
    }
  }
};
export const tail: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "tail"
  ],
  mapper: {
    serializedName: "Tail",
    type: {
      name: "String"
    }
  }
};
export const taskIdFilter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "taskIdFilter"
  ],
  mapper: {
    serializedName: "TaskIdFilter",
    type: {
      name: "String"
    }
  }
};
export const timeout: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "timeout"
  ],
  mapper: {
    serializedName: "timeout",
    defaultValue: 60,
    constraints: {
      InclusiveMaximum: 4294967295,
      InclusiveMinimum: 1
    },
    type: {
      name: "Number"
    }
  }
};
export const typeFilter: msRest.OperationQueryParameter = {
  parameterPath: "typeFilter",
  mapper: {
    required: true,
    serializedName: "TypeFilter",
    defaultValue: 65535,
    type: {
      name: "Number"
    }
  }
};
export const volumeResourceName: msRest.OperationURLParameter = {
  parameterPath: "volumeResourceName",
  mapper: {
    required: true,
    serializedName: "volumeResourceName",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
