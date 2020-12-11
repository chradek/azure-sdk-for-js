// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// const crypto = require("isomorphic-webcrypto");
import crypto from "isomorphic-webcrypto";
import { Buffer } from "buffer";

/**
 * @internal
 * @ignore
 */
export async function sha256Digest(body: string | undefined): Promise<string> {
  const byteBody = new Uint8Array(Buffer.from(body || "", "utf8").buffer);
  const digest = await crypto.subtle.digest({ name: "SHA-256" }, byteBody);

  return Buffer.from(digest).toString("base64");
}

/**
 * @internal
 * @ignore
 */
export async function sha256Hmac(secret: string, stringToSign: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new Uint8Array(Buffer.from(secret, "base64").buffer),
    {
      name: "HMAC",
      hash: "SHA-256"
    },
    false,
    ["sign"]
  );

  const sigArray = await crypto.subtle.sign(
    "HMAC",
    key,
    new Uint8Array(Buffer.from(stringToSign, "utf8").buffer)
  );
  return Buffer.from(sigArray).toString("base64");
}
