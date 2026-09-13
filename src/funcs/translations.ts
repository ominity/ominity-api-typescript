import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import { executeOperation } from "../lib/operation.js";
import * as operations from "../models/operations/index.js";

export const translationsBulk = (client: ClientSDK, request: operations.BulkTranslateRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "translations.bulk", method: "POST", path: () => "/translations/bulk", requestSchema: operations.BulkTranslateRequest$outboundSchema, responseSchema: operations.BulkTranslateResponse$inboundSchema, body: (v) => v.data }, options);
