// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import { createSasTokenProvider, SasTokenProviderImpl } from "../src/index";

describe("SasTokenProvider", function(): void {
  describe("SasTokenProvider", () => {
    it("should work as expected with AzureNamedKeyCredential", async function(): Promise<void> {
      const keyName = "myKeyName";
      const key = "importantValue";
      const tokenProvider = new SasTokenProviderImpl(new AzureNamedKeyCredential(keyName, key));
      const now = Math.floor(Date.now() / 1000) + 3600;
      const tokenInfo = tokenProvider.getToken("myaudience");
      tokenInfo.token.should.match(
        /SharedAccessSignature sr=myaudience&sig=(.*)&se=\d{10}&skn=myKeyName/g
      );
      tokenInfo.expiresOnTimestamp.should.equal(now);
    });

    it("should work as expected when created from createSasTokenProvider (sak)", async function(): Promise<
      void
    > {
      const tokenProvider = createSasTokenProvider({
        sharedAccessKeyName: "sakName",
        sharedAccessKey: "sak"
      });
      const now = Math.floor(Date.now() / 1000) + 3600;
      const tokenInfo = tokenProvider.getToken("sb://hostname.servicebus.windows.net/");
      tokenInfo.token.should.match(
        /SharedAccessSignature sr=sb%3A%2F%2Fhostname.servicebus.windows.net%2F&sig=(.*)&se=\d{10}&skn=sakName/g
      );
      tokenInfo.expiresOnTimestamp.should.equal(now);
    });
  });

  it("should work as expected with AzureSASCredential", async function(): Promise<void> {
    const sasTokenProvider = new SasTokenProviderImpl(
      new AzureSASCredential("SharedAccessSignature se=<blah>")
    );
    const accessToken = sasTokenProvider.getToken("audience isn't used");

    should.equal(
      accessToken.token,
      "SharedAccessSignature se=<blah>",
      "SAS URI we were constructed with should just be returned verbatim without interpretation (and the audience is ignored)"
    );

    should.equal(
      accessToken.expiresOnTimestamp,
      0,
      "SAS URI always returns 0 for expiry (ignoring what's in the SAS token)"
    );
  });

  it("should work as expected when created from createSasTokenProvider (signature)", async function(): Promise<
    void
  > {
    const tokenProvider = createSasTokenProvider({ sharedAccessSignature: "<blah>" });
    const tokenInfo = tokenProvider.getToken("sb://hostname.servicebus.windows.net/");
    tokenInfo.token.should.match(/<blah>/g);
    tokenInfo.expiresOnTimestamp.should.equal(0);
  });
});
