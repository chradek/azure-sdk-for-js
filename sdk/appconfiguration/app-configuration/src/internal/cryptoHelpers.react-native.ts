// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const crypto = require("isomorphic-webcrypto");

import { Buffer } from "buffer";

/**
 * @internal
 * @ignore
 */
export async function sha256Digest(body: string | undefined): Promise<string> {
  const data = Buffer.from(body || "", "utf8");
  const byteBody = new Uint8Array(data.buffer);
  const hash = await crypto.subtle.digest({ name: "SHA-256" }, byteBody);
  return Buffer.from(hash).toString("base64");
}

/**
 * @internal
 * @ignore
 */
export async function sha256Hmac(secret: string, stringToSign: string): Promise<string> {
  const encodedSecret = new Uint8Array(Buffer.from(secret, "base64").buffer);
  const key = await crypto.subtle.importKey(
    "raw",
    encodedSecret,
    {
      name: "HMAC",
      hash: { name: "SHA-256" }
    },
    false,
    ["sign"]
  );

  const sigArray = await crypto.subtle.sign(
    {
      name: "HMAC",
      hash: { name: "SHA-256" }
    },
    key,
    new Uint8Array(Buffer.from(stringToSign, "utf8").buffer)
  );
  return Buffer.from(sigArray).toString("base64");
}
