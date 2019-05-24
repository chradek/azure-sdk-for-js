/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CloudErrorMapper, BaseResourceMapper } from "@azure/ms-rest-azure-js";
import * as msRest from "@azure/ms-rest-js";

export const CloudError = CloudErrorMapper;
export const BaseResource = BaseResourceMapper;

export const AvailabilityStatusPropertiesRecentlyResolvedState: msRest.CompositeMapper = {
  serializedName: "availabilityStatus_properties_recentlyResolvedState",
  type: {
    name: "Composite",
    className: "AvailabilityStatusPropertiesRecentlyResolvedState",
    modelProperties: {
      unavailableOccurredTime: {
        serializedName: "unavailableOccurredTime",
        type: {
          name: "DateTime"
        }
      },
      resolvedTime: {
        serializedName: "resolvedTime",
        type: {
          name: "DateTime"
        }
      },
      unavailabilitySummary: {
        serializedName: "unavailabilitySummary",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RecommendedAction: msRest.CompositeMapper = {
  serializedName: "recommendedAction",
  type: {
    name: "Composite",
    className: "RecommendedAction",
    modelProperties: {
      action: {
        serializedName: "action",
        type: {
          name: "String"
        }
      },
      actionUrl: {
        serializedName: "actionUrl",
        type: {
          name: "String"
        }
      },
      actionUrlText: {
        serializedName: "actionUrlText",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ServiceImpactingEventStatus: msRest.CompositeMapper = {
  serializedName: "serviceImpactingEvent_status",
  type: {
    name: "Composite",
    className: "ServiceImpactingEventStatus",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ServiceImpactingEventIncidentProperties: msRest.CompositeMapper = {
  serializedName: "serviceImpactingEvent_incidentProperties",
  type: {
    name: "Composite",
    className: "ServiceImpactingEventIncidentProperties",
    modelProperties: {
      title: {
        serializedName: "title",
        type: {
          name: "String"
        }
      },
      service: {
        serializedName: "service",
        type: {
          name: "String"
        }
      },
      region: {
        serializedName: "region",
        type: {
          name: "String"
        }
      },
      incidentType: {
        serializedName: "incidentType",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ServiceImpactingEvent: msRest.CompositeMapper = {
  serializedName: "serviceImpactingEvent",
  type: {
    name: "Composite",
    className: "ServiceImpactingEvent",
    modelProperties: {
      eventStartTime: {
        serializedName: "eventStartTime",
        type: {
          name: "DateTime"
        }
      },
      eventStatusLastModifiedTime: {
        serializedName: "eventStatusLastModifiedTime",
        type: {
          name: "DateTime"
        }
      },
      correlationId: {
        serializedName: "correlationId",
        type: {
          name: "String"
        }
      },
      status: {
        serializedName: "status",
        type: {
          name: "Composite",
          className: "ServiceImpactingEventStatus"
        }
      },
      incidentProperties: {
        serializedName: "incidentProperties",
        type: {
          name: "Composite",
          className: "ServiceImpactingEventIncidentProperties"
        }
      }
    }
  }
};

export const AvailabilityStatusProperties: msRest.CompositeMapper = {
  serializedName: "availabilityStatus_properties",
  type: {
    name: "Composite",
    className: "AvailabilityStatusProperties",
    modelProperties: {
      availabilityState: {
        serializedName: "availabilityState",
        type: {
          name: "Enum",
          allowedValues: [
            "Available",
            "Unavailable",
            "Unknown"
          ]
        }
      },
      summary: {
        serializedName: "summary",
        type: {
          name: "String"
        }
      },
      detailedStatus: {
        serializedName: "detailedStatus",
        type: {
          name: "String"
        }
      },
      reasonType: {
        serializedName: "reasonType",
        type: {
          name: "String"
        }
      },
      rootCauseAttributionTime: {
        serializedName: "rootCauseAttributionTime",
        type: {
          name: "DateTime"
        }
      },
      healthEventType: {
        serializedName: "healthEventType",
        type: {
          name: "String"
        }
      },
      healthEventCause: {
        serializedName: "healthEventCause",
        type: {
          name: "String"
        }
      },
      healthEventCategory: {
        serializedName: "healthEventCategory",
        type: {
          name: "String"
        }
      },
      healthEventId: {
        serializedName: "healthEventId",
        type: {
          name: "String"
        }
      },
      resolutionETA: {
        serializedName: "resolutionETA",
        type: {
          name: "DateTime"
        }
      },
      occuredTime: {
        serializedName: "occuredTime",
        type: {
          name: "DateTime"
        }
      },
      reasonChronicity: {
        serializedName: "reasonChronicity",
        type: {
          name: "Enum",
          allowedValues: [
            "Transient",
            "Persistent"
          ]
        }
      },
      reportedTime: {
        serializedName: "reportedTime",
        type: {
          name: "DateTime"
        }
      },
      recentlyResolvedState: {
        serializedName: "recentlyResolvedState",
        type: {
          name: "Composite",
          className: "AvailabilityStatusPropertiesRecentlyResolvedState"
        }
      },
      recommendedActions: {
        serializedName: "recommendedActions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "RecommendedAction"
            }
          }
        }
      },
      serviceImpactingEvents: {
        serializedName: "serviceImpactingEvents",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ServiceImpactingEvent"
            }
          }
        }
      }
    }
  }
};

export const AvailabilityStatus: msRest.CompositeMapper = {
  serializedName: "availabilityStatus",
  type: {
    name: "Composite",
    className: "AvailabilityStatus",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        type: {
          name: "String"
        }
      },
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "AvailabilityStatusProperties"
        }
      }
    }
  }
};

export const OperationDisplay: msRest.CompositeMapper = {
  serializedName: "operation_display",
  type: {
    name: "Composite",
    className: "OperationDisplay",
    modelProperties: {
      provider: {
        serializedName: "provider",
        type: {
          name: "String"
        }
      },
      resource: {
        serializedName: "resource",
        type: {
          name: "String"
        }
      },
      operation: {
        serializedName: "operation",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Operation: msRest.CompositeMapper = {
  serializedName: "operation",
  type: {
    name: "Composite",
    className: "Operation",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      display: {
        serializedName: "display",
        type: {
          name: "Composite",
          className: "OperationDisplay"
        }
      }
    }
  }
};

export const OperationListResult: msRest.CompositeMapper = {
  serializedName: "operationListResult",
  type: {
    name: "Composite",
    className: "OperationListResult",
    modelProperties: {
      value: {
        required: true,
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Operation"
            }
          }
        }
      }
    }
  }
};

export const ErrorResponse: msRest.CompositeMapper = {
  serializedName: "ErrorResponse",
  type: {
    name: "Composite",
    className: "ErrorResponse",
    modelProperties: {
      code: {
        readOnly: true,
        serializedName: "code",
        type: {
          name: "String"
        }
      },
      message: {
        readOnly: true,
        serializedName: "message",
        type: {
          name: "String"
        }
      },
      details: {
        readOnly: true,
        serializedName: "details",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const AvailabilityStatusListResult: msRest.CompositeMapper = {
  serializedName: "availabilityStatusListResult",
  type: {
    name: "Composite",
    className: "AvailabilityStatusListResult",
    modelProperties: {
      value: {
        required: true,
        serializedName: "",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "AvailabilityStatus"
            }
          }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};
