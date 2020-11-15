let nock = require('nock');

module.exports.hash = "e7ba885af99b2b7d9798f6275a212283";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '14df9074-41c6-47c8-877d-aa26fae27c02',
  'x-ms-ests-server',
  '2.1.11198.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmMKCkDOPBVKoNBaj_w0cej0CyfMAQAAAJPWPNcOAAAA; expires=Thu, 10-Dec-2020 18:44:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 10 Nov 2020 18:44:35 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/fe9b23c9-2aa5-4afe-bc9d-3bbdaa33db15',
  'x-envoy-upstream-service-time',
  '918',
  'apim-request-id',
  'fe9b23c9-2aa5-4afe-bc9d-3bbdaa33db15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:44:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/fe9b23c9-2aa5-4afe-bc9d-3bbdaa33db15')
  .reply(200, {"status":"running","createdDateTime":"2020-11-10T18:44:38Z","lastUpdatedDateTime":"2020-11-10T18:44:38Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'c63c7a6c-5116-44ce-9a9c-e0510e57d6d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:44:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/fe9b23c9-2aa5-4afe-bc9d-3bbdaa33db15')
  .reply(200, {"status":"running","createdDateTime":"2020-11-10T18:44:38Z","lastUpdatedDateTime":"2020-11-10T18:44:38Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '0c6477b2-65b2-45c1-8b62-648dadb16a3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:44:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/prebuilt/businessCard/analyzeResults/fe9b23c9-2aa5-4afe-bc9d-3bbdaa33db15')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-10T18:44:38Z","lastUpdatedDateTime":"2020-11-10T18:44:41Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-17.0956,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:businesscard","pageRange":[1,1],"fields":{"ContactNames":{"type":"array","valueArray":[{"type":"object","valueObject":{"FirstName":{"type":"string","valueString":"Avery","text":"Avery","boundingBox":[703,1096,1134,989,1165,1109,733,1206],"page":1},"LastName":{"type":"string","valueString":"Smith","text":"Smith","boundingBox":[1186,976,1585,879,1618,998,1218,1096],"page":1}},"text":"Dr. Avery Smith","boundingBox":[419.3,1154.6,1589.6,877.9,1618.9,1001.7,448.6,1278.4],"confidence":0.793}]},"JobTitles":{"type":"array","valueArray":[{"type":"string","valueString":"Senior Researcher","text":"Senior Researcher","boundingBox":[451.8,1301.9,1313.5,1099.9,1333.8,1186.7,472.2,1388.7],"page":1,"confidence":0.99}]},"Departments":{"type":"array","valueArray":[{"type":"string","valueString":"Cloud & Al Department","text":"Cloud & Al Department","boundingBox":[480.1,1403.3,1590.5,1129.6,1612.6,1219.6,502.3,1493.3],"page":1,"confidence":0.99}]},"Emails":{"type":"array","valueArray":[{"type":"string","valueString":"avery.smith@contoso.com","text":"avery.smith@contoso.com","boundingBox":[2107,934,2917,696,2935,764,2126,995],"page":1,"confidence":0.99}]},"Websites":{"type":"array","valueArray":[{"type":"string","valueString":"https://www.contoso.com/","text":"https://www.contoso.com/","boundingBox":[2121,1002,2992,755,3014,826,2143,1077],"page":1,"confidence":0.995}]},"MobilePhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 7911 123456","boundingBox":[2434.9,1033.3,3072,836,3096.2,914.3,2459.1,1111.6],"page":1,"confidence":0.99}]},"OtherPhones":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 9876 5432","boundingBox":[2473.2,1115.4,3139.2,907.7,3163.2,984.7,2497.2,1192.4],"page":1,"confidence":0.99}]},"Faxes":{"type":"array","valueArray":[{"type":"phoneNumber","text":"+44 (0) 20 6789 2345","boundingBox":[2525,1185.4,3192.4,977.9,3217.9,1060,2550.5,1267.5],"page":1,"confidence":0.99}]},"Addresses":{"type":"array","valueArray":[{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","text":"2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1230,2138,2535.2,1678.6,2614.2,1903.1,1309,2362.5],"page":1,"confidence":0.977}]},"CompanyNames":{"type":"array","valueArray":[{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[1152,1916,2293,1552,2358,1733,1219,2105],"page":1,"confidence":0.067}]}}}]}}, [
  'Content-Length',
  '2679',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '1c5335bd-9d25-43de-b0fc-304d31ef3c11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 10 Nov 2020 18:44:44 GMT'
]);