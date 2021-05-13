// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";

export abstract class Fetcher {
  abstract fetch(path: string, options: OperationOptions): any;
}
