// Copyright (c) Microsoft.
// Licensed under the MIT license.

"use strict";

interface Contents {
  "@type"?: string;
  name: string;
  schema: string;
}

export interface DTDL extends JSON {
  "@context": any[];
  "@id": string;
  extends: string;
  contents: Contents[];
}