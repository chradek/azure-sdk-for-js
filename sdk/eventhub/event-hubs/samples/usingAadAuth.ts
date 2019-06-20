/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to instantiate EventHubsClient using AAD token credentials
  obtained from using Service Principal Secrets.

  Setup :
    Please ensure that your Azure Event Hubs resource is in US East, US East 2, or West Europe
    region. AAD Role Based Access Control is not supported in other regions yet.

    Register a new application in AAD and assign the "owner" role to it
     - See https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app
       to register a new application in the Azure Active Directory.
     - Note down the CLIENT_ID and TENANT_ID from the above step.
     - In the "Certificates & Secrets" tab, create a secret and note that down.
     - In the Azure portal, go to your Even Hubs resource and click on the Access control (IAM)
       tab. Here, assign "owner" role to the registered application.
*/
import { EventHubClient } from "@azure/event-hubs";
import { EnvironmentCredential } from "@azure/identity";

// Define Event Hubs Endpoint and related entity name here here
const evenHubsEndpoint = ""; // <your-eventhubs-namespace>.servicebus.windows.net
const eventHubName = "";

// Define AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET of your AAD application in your environment

async function main(): Promise<void> {
  const credential = new EnvironmentCredential();
  const client = new EventHubClient(evenHubsEndpoint, eventHubName, credential);
  /*
   Refer to other samples, and place your code here
   to send/receive events
  */
  await client.close();
}

main().catch(err => {
  console.log("error: ", err);
});
