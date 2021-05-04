// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { convertDtmiToPath, DTDL, logger, ModelError } from "./internal";

export class ResolverError extends Error {
  cause: Error | undefined;

  constructor(message: string, cause?: Error) {
    super(message);
    this.cause = cause;
  }
}

export class DtmiResolver {
  private _fetcher;
  constructor(fetcher: any) {
    this._fetcher = fetcher;
  }

  async resolve(dtmis: string[], expandedModel: boolean = false): Promise<{[dtmi: string]: DTDL}> {
    let modelMap: any = {};
    let promiseList = []; 
    for (let dtmi of dtmis) {
      let dtdlPath = convertDtmiToPath(dtmi, expandedModel);
      logger.info(`Model ${dtmi} located in repository at ${dtdlPath}`);
      let mypromise = this._fetcher.fetch(dtdlPath).then((dtdl: any[] | any) => {
        if (expandedModel) {
          const modelIds: string[] = (dtdl as any[]).map((model:any) => model["@id"]);
          if (!modelIds.includes(dtmi)) {
            throw new ModelError(`DTMI mismatch on expanded DTDL - Request: ${dtmi}, Response: ${modelIds}`);
          }
          for (let model of dtdl) {
            modelMap[model["@id"]] = model;
          }
        } else {
          let model = dtdl;
          if (model["@id"] != dtmi) {
            new ModelError(`DTMI mismatch - Request: ${dtmi}, Response ${model["@id"]}`);
          }
  
          modelMap[`${dtmi}`] = dtdl;
        }
      });
      promiseList.push(mypromise);
    }

    await Promise.all(promiseList);
    return modelMap;
  }
}