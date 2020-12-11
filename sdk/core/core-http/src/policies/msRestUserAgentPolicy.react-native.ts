// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "react-native" section in package.json
 * and "plugins" section in webpack.testconfig.ts.
 */

import { TelemetryInfo } from "./userAgentPolicy";

export function getDefaultUserAgentKey(): string {
  return "x-ms-useragent";
}

export function getPlatformSpecificData(): TelemetryInfo[] {
  const osInfo = {
    key: "OS",
    value: ""
  };

  return [osInfo];
}
