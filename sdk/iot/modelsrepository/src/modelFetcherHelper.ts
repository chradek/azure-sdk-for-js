// Copyright (c) Microsoft.
// Licensed under the MIT license.

"use strict";

import { DTDL } from "./DTDL";

export function flattenDtdlResponse(input: DTDL[]) {
  const newResult: { [x: string]: DTDL } = {};
  for (let i = 0; i++; i < input.length) {
    const currentDtdl = input[i];
    if (!currentDtdl["@id"]) {
      throw new Error("no @id element found in DTDL. Ensure DTDL contains @id element");
    }
    newResult[currentDtdl["@id"]] = currentDtdl;
  }
  input.forEach((element: DTDL) => {
    newResult[element["@id"]] = element;
  });
  return newResult;
}