/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { MetricDefinitions } from "./operations";
import { MetricsDefinitionsClientContext } from "./metricsDefinitionsClientContext";
import {
  MetricsDefinitionsClientOptionalParams,
  ApiVersion20170501Preview
} from "./models";

/** @hidden */
export class MetricsDefinitionsClient extends MetricsDefinitionsClientContext {
  /**
   * Initializes a new instance of the MetricsDefinitionsClient class.
   * @param apiVersion Api Version
   * @param options The parameter options
   */
  constructor(
    apiVersion: ApiVersion20170501Preview,
    options?: MetricsDefinitionsClientOptionalParams
  ) {
    super(apiVersion, options);
    this.metricDefinitions = new MetricDefinitions(this);
  }

  metricDefinitions: MetricDefinitions;
}
