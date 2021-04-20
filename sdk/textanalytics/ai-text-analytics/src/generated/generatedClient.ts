/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { OperationOptions, OperationSpec, createSerializer } from "@azure/core-client";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { GeneratedClientContext } from "./generatedClientContext";
import {
  GeneratedClientOptionalParams,
  GeneratedClientAnalyzeOptionalParams,
  GeneratedClientAnalyzeResponse,
  GeneratedClientAnalyzeStatusOptionalParams,
  GeneratedClientAnalyzeStatusResponse,
  GeneratedClientHealthStatusOptionalParams,
  GeneratedClientHealthStatusResponse,
  GeneratedClientCancelHealthJobResponse,
  MultiLanguageBatchInput,
  GeneratedClientHealthOptionalParams,
  GeneratedClientHealthResponse,
  GeneratedClientEntitiesRecognitionGeneralOptionalParams,
  GeneratedClientEntitiesRecognitionGeneralResponse,
  GeneratedClientEntitiesRecognitionPiiOptionalParams,
  GeneratedClientEntitiesRecognitionPiiResponse,
  GeneratedClientEntitiesLinkingOptionalParams,
  GeneratedClientEntitiesLinkingResponse,
  GeneratedClientKeyPhrasesOptionalParams,
  GeneratedClientKeyPhrasesResponse,
  LanguageBatchInput,
  GeneratedClientLanguagesOptionalParams,
  GeneratedClientLanguagesResponse,
  GeneratedClientSentimentOptionalParams,
  GeneratedClientSentimentResponse
} from "./models";

/** @hidden */
export class GeneratedClient extends GeneratedClientContext {
  /**
   * Initializes a new instance of the GeneratedClient class.
   * @param endpoint Supported Cognitive Services endpoints (protocol and hostname, for example:
   *                 https://westus.api.cognitive.microsoft.com).
   * @param options The parameter options
   */
  constructor(endpoint: string, options?: GeneratedClientOptionalParams) {
    super(endpoint, options);
  }

  /**
   * Submit a collection of text documents for analysis. Specify one or more unique tasks to be executed.
   * @param options The options parameters.
   */
  analyze(
    options?: GeneratedClientAnalyzeOptionalParams
  ): Promise<GeneratedClientAnalyzeResponse> {
    return this.sendOperationRequest(
      { options },
      analyzeOperationSpec
    );
  }

  /**
   * Get the status of an analysis job.  A job may consist of one or more tasks.  Once all tasks are
   * completed, the job will transition to the completed state and results will be available for each
   * task.
   * @param jobId Job ID for Analyze
   * @param options The options parameters.
   */
  analyzeStatus(
    jobId: string,
    options?: GeneratedClientAnalyzeStatusOptionalParams
  ): Promise<GeneratedClientAnalyzeStatusResponse> {
    return this.sendOperationRequest(
      { jobId, options },
      analyzeStatusOperationSpec
    );
  }

  /**
   * Get details of the healthcare prediction job specified by the jobId.
   * @param jobId Job ID
   * @param options The options parameters.
   */
  healthStatus(
    jobId: string,
    options?: GeneratedClientHealthStatusOptionalParams
  ): Promise<GeneratedClientHealthStatusResponse> {
    return this.sendOperationRequest(
      { jobId, options },
      healthStatusOperationSpec
    );
  }

  /**
   * Cancel healthcare prediction job.
   * @param jobId Job ID
   * @param options The options parameters.
   */
  cancelHealthJob(
    jobId: string,
    options?: OperationOptions
  ): Promise<GeneratedClientCancelHealthJobResponse> {
    return this.sendOperationRequest(
      { jobId, options },
      cancelHealthJobOperationSpec
    );
  }

  /**
   * Start a healthcare analysis job to recognize healthcare related entities (drugs, conditions,
   * symptoms, etc) and their relations.
   * @param input Collection of documents to analyze.
   * @param options The options parameters.
   */
  health(
    input: MultiLanguageBatchInput,
    options?: GeneratedClientHealthOptionalParams
  ): Promise<GeneratedClientHealthResponse> {
    return this.sendOperationRequest(
      { input, options },
      healthOperationSpec
    );
  }

  /**
   * The API returns a list of general named entities in a given document. For the list of supported
   * entity types, check <a href="https://aka.ms/taner">Supported Entity Types in Text Analytics API</a>.
   * See the <a href="https://aka.ms/talangs">Supported languages in Text Analytics API</a> for the list
   * of enabled languages.
   * @param input Collection of documents to analyze.
   * @param options The options parameters.
   */
  entitiesRecognitionGeneral(
    input: MultiLanguageBatchInput,
    options?: GeneratedClientEntitiesRecognitionGeneralOptionalParams
  ): Promise<GeneratedClientEntitiesRecognitionGeneralResponse> {
    return this.sendOperationRequest(
      { input, options },
      entitiesRecognitionGeneralOperationSpec
    );
  }

  /**
   * The API returns a list of entities with personal information (\"SSN\", \"Bank Account\" etc) in the
   * document. For the list of supported entity types, check <a href="https://aka.ms/tanerpii">Supported
   * Entity Types in Text Analytics API</a>. See the <a href="https://aka.ms/talangs">Supported languages
   * in Text Analytics API</a> for the list of enabled languages.
   *
   * @param input Collection of documents to analyze.
   * @param options The options parameters.
   */
  entitiesRecognitionPii(
    input: MultiLanguageBatchInput,
    options?: GeneratedClientEntitiesRecognitionPiiOptionalParams
  ): Promise<GeneratedClientEntitiesRecognitionPiiResponse> {
    return this.sendOperationRequest(
      { input, options },
      entitiesRecognitionPiiOperationSpec
    );
  }

  /**
   * The API returns a list of recognized entities with links to a well known knowledge base. See the <a
   * href="https://aka.ms/talangs">Supported languages in Text Analytics API</a> for the list of enabled
   * languages.
   * @param input Collection of documents to analyze.
   * @param options The options parameters.
   */
  entitiesLinking(
    input: MultiLanguageBatchInput,
    options?: GeneratedClientEntitiesLinkingOptionalParams
  ): Promise<GeneratedClientEntitiesLinkingResponse> {
    return this.sendOperationRequest(
      { input, options },
      entitiesLinkingOperationSpec
    );
  }

  /**
   * The API returns a list of strings denoting the key phrases in the input text. See the <a
   * href="https://aka.ms/talangs">Supported languages in Text Analytics API</a> for the list of enabled
   * languages.
   * @param input Collection of documents to analyze.
   * @param options The options parameters.
   */
  keyPhrases(
    input: MultiLanguageBatchInput,
    options?: GeneratedClientKeyPhrasesOptionalParams
  ): Promise<GeneratedClientKeyPhrasesResponse> {
    return this.sendOperationRequest(
      { input, options },
      keyPhrasesOperationSpec
    );
  }

  /**
   * The API returns the detected language and a numeric score between 0 and 1. Scores close to 1
   * indicate 100% certainty that the identified language is true. See the <a
   * href="https://aka.ms/talangs">Supported languages in Text Analytics API</a> for the list of enabled
   * languages.
   * @param input Collection of documents to analyze for language endpoint.
   * @param options The options parameters.
   */
  languages(
    input: LanguageBatchInput,
    options?: GeneratedClientLanguagesOptionalParams
  ): Promise<GeneratedClientLanguagesResponse> {
    return this.sendOperationRequest(
      { input, options },
      languagesOperationSpec
    );
  }

  /**
   * The API returns a detailed sentiment analysis for the input text. The analysis is done in multiple
   * levels of granularity, start from the a document level, down to sentence and key terms (targets and
   * assessments).
   * @param input Collection of documents to analyze.
   * @param options The options parameters.
   */
  sentiment(
    input: MultiLanguageBatchInput,
    options?: GeneratedClientSentimentOptionalParams
  ): Promise<GeneratedClientSentimentResponse> {
    return this.sendOperationRequest(
      { input, options },
      sentimentOperationSpec
    );
  }
}
// Operation Specifications
const serializer = createSerializer(Mappers, /* isXml */ false);

const analyzeOperationSpec: OperationSpec = {
  path: "/analyze",
  httpMethod: "POST",
  responses: {
    202: {
      headersMapper: Mappers.GeneratedClientAnalyzeHeaders
    },
    400: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    500: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    }
  },
  requestBody: Parameters.body,
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const analyzeStatusOperationSpec: OperationSpec = {
  path: "/analyze/jobs/{jobId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AnalyzeJobState
    },
    404: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    500: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    }
  },
  queryParameters: [
    Parameters.includeStatistics,
    Parameters.top,
    Parameters.skip
  ],
  urlParameters: [Parameters.endpoint, Parameters.jobId],
  headerParameters: [Parameters.accept],
  serializer
};
const healthStatusOperationSpec: OperationSpec = {
  path: "/entities/health/jobs/{jobId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.HealthcareJobState
    },
    404: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    500: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    }
  },
  queryParameters: [
    Parameters.includeStatistics,
    Parameters.top,
    Parameters.skip
  ],
  urlParameters: [Parameters.endpoint, Parameters.jobId1],
  headerParameters: [Parameters.accept],
  serializer
};
const cancelHealthJobOperationSpec: OperationSpec = {
  path: "/entities/health/jobs/{jobId}",
  httpMethod: "DELETE",
  responses: {
    202: {
      headersMapper: Mappers.GeneratedClientCancelHealthJobHeaders
    },
    404: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    500: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    }
  },
  urlParameters: [Parameters.endpoint, Parameters.jobId1],
  headerParameters: [Parameters.accept],
  serializer
};
const healthOperationSpec: OperationSpec = {
  path: "/entities/health/jobs",
  httpMethod: "POST",
  responses: {
    202: {
      headersMapper: Mappers.GeneratedClientHealthHeaders
    },
    400: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    500: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    }
  },
  requestBody: Parameters.input,
  queryParameters: [Parameters.modelVersion, Parameters.stringIndexType],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const entitiesRecognitionGeneralOperationSpec: OperationSpec = {
  path: "/entities/recognition/general",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.EntitiesResult
    },
    400: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    500: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    }
  },
  requestBody: Parameters.input,
  queryParameters: [
    Parameters.includeStatistics,
    Parameters.modelVersion,
    Parameters.stringIndexType
  ],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const entitiesRecognitionPiiOperationSpec: OperationSpec = {
  path: "/entities/recognition/pii",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.PiiResult
    },
    400: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    500: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    }
  },
  requestBody: Parameters.input,
  queryParameters: [
    Parameters.includeStatistics,
    Parameters.modelVersion,
    Parameters.stringIndexType,
    Parameters.domain,
    Parameters.piiCategories
  ],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const entitiesLinkingOperationSpec: OperationSpec = {
  path: "/entities/linking",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.EntityLinkingResult
    },
    400: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    500: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    }
  },
  requestBody: Parameters.input,
  queryParameters: [
    Parameters.includeStatistics,
    Parameters.modelVersion,
    Parameters.stringIndexType
  ],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const keyPhrasesOperationSpec: OperationSpec = {
  path: "/keyPhrases",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.KeyPhraseResult
    },
    400: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    500: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    }
  },
  requestBody: Parameters.input,
  queryParameters: [Parameters.includeStatistics, Parameters.modelVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const languagesOperationSpec: OperationSpec = {
  path: "/languages",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.LanguageResult
    },
    400: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    500: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    }
  },
  requestBody: Parameters.input1,
  queryParameters: [Parameters.includeStatistics, Parameters.modelVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const sentimentOperationSpec: OperationSpec = {
  path: "/sentiment",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SentimentResponse
    },
    400: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    },
    500: {
      bodyMapper: Mappers.ErrorResponse,
      isError: true
    }
  },
  requestBody: Parameters.input,
  queryParameters: [
    Parameters.includeStatistics,
    Parameters.modelVersion,
    Parameters.stringIndexType,
    Parameters.opinionMining
  ],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
