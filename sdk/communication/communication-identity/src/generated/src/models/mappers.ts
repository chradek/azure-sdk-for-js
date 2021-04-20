/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const CommunicationIdentityCreateRequest: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CommunicationIdentityCreateRequest",
    modelProperties: {
      createTokenWithScopes: {
        serializedName: "createTokenWithScopes",
        type: {
          name: "Sequence",
          element: { type: { name: "String" } }
        }
      }
    }
  }
};

export const CommunicationIdentityAccessTokenResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CommunicationIdentityAccessTokenResult",
    modelProperties: {
      identity: {
        serializedName: "identity",
        type: {
          name: "Composite",
          className: "CommunicationIdentity"
        }
      },
      accessToken: {
        serializedName: "accessToken",
        type: {
          name: "Composite",
          className: "CommunicationIdentityAccessToken"
        }
      }
    }
  }
};

export const CommunicationIdentity: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CommunicationIdentity",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const CommunicationIdentityAccessToken: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CommunicationIdentityAccessToken",
    modelProperties: {
      token: {
        serializedName: "token",
        required: true,
        type: {
          name: "String"
        }
      },
      expiresOn: {
        serializedName: "expiresOn",
        required: true,
        type: {
          name: "DateTime"
        }
      }
    }
  }
};

export const CommunicationErrorResponse: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CommunicationErrorResponse",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "CommunicationError"
        }
      }
    }
  }
};

export const CommunicationError: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CommunicationError",
    modelProperties: {
      code: {
        serializedName: "code",
        required: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String"
        }
      },
      target: {
        serializedName: "target",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      details: {
        serializedName: "details",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "CommunicationError" }
          }
        }
      },
      innerError: {
        serializedName: "innererror",
        type: {
          name: "Composite",
          className: "CommunicationError"
        }
      }
    }
  }
};

export const CommunicationIdentityAccessTokenRequest: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CommunicationIdentityAccessTokenRequest",
    modelProperties: {
      scopes: {
        serializedName: "scopes",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "String" } }
        }
      }
    }
  }
};
