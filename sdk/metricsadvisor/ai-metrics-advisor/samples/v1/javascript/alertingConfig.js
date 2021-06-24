// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates Alerting Configuration CRUD operations.
 */

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

const {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient
} = require("@azure/ai-metrics-advisor");

main()
  .then((_) => {
    console.log("Succeeded");
  })
  .catch((err) => {
    console.log("Error occurred:");
    console.log(err);
  });

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const detectionConfigId =
    process.env["METRICS_ADVISOR_DETECTION_CONFIG_ID"] || "<detection config id>";
  const hookId = process.env["METRICS_ADVISOR_HOOK_ID"] || "<existing hook id>";

  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);
  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);

  const created = await createAlertConfig(adminClient, detectionConfigId);

  await updateAlertConfig(adminClient, created.id, detectionConfigId, [hookId]);

  await listAlertConfig(adminClient, detectionConfigId);

  await deleteAlertConfig(adminClient, created.id);
}

// create a new alerting configuration
async function createAlertConfig(adminClient, detectionConfigId) {
  console.log("Creating a new alerting configuration...");
  const alertConfig = {
    name: "js alerting config name " + new Date().getTime().toString(),
    crossMetricsOperator: "AND",
    metricAlertConfigurations: [
      {
        detectionConfigurationId: detectionConfigId,
        alertScope: {
          scopeType: "All"
        }
      },
      {
        detectionConfigurationId: detectionConfigId,
        alertScope: {
          scopeType: "Dimension",
          dimensionAnomalyScope: { city: "Manila", category: "Handmade" }
        }
      }
    ],
    hookIds: [],
    description: "alerting config description"
  };
  const result = await adminClient.createAlertConfig(alertConfig);
  console.log(result);
  return result;
}

// updating an alerting configuration
async function updateAlertConfig(adminClient, alertConfigId, detectionConfigId, hookIds) {
  const patch = {
    name: "new Name",
    //description: "new description",
    hookIds,
    crossMetricsOperator: "OR",
    metricAlertConfigurations: [
      {
        detectionConfigurationId: detectionConfigId,
        alertScope: {
          scopeType: "All"
        }
      },
      {
        detectionConfigurationId: detectionConfigId,
        alertScope: {
          scopeType: "Dimension",
          dimensionAnomalyScope: {
            city: "Kolkata",
            category: "Shoes Handbags & Sunglasses"
          }
        }
      }
    ]
  };
  console.log(`Updating alerting configuration ${detectionConfigId}`);
  await adminClient.updateAlertConfig(alertConfigId, patch);
  const updated = await adminClient.getAlertConfig(alertConfigId);
  return updated;
}

async function deleteAlertConfig(adminClient, alertConfigId) {
  console.log(`Deleting alerting configuration ${alertConfigId}`);
  await adminClient.deleteAlertConfig(alertConfigId);
}

async function listAlertConfig(adminClient, detectdionConfigId) {
  console.log(`Listing alert configurations for detection configuration ${detectdionConfigId}`);
  let i = 1;
  const iterator = adminClient.listAlertConfigs(detectdionConfigId);
  for await (const config of iterator) {
    console.log(`Alert configuration ${i++}`);
    console.log(config);
  }
}
