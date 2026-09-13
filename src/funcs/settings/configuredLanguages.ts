import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { encodeOperationQuery, executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

export const configuredLanguagesList = (client: ClientSDK, request: operations.ListConfiguredLanguagesRequest = {}, options?: RequestOptions) => executeOperation(client, request, { operationID: "settings.languages.list", method: "GET", path: () => "/settings/languages", requestSchema: operations.ListConfiguredLanguagesRequest$outboundSchema, responseSchema: operations.ListConfiguredLanguagesResponse$inboundSchema, query: (v) => encodeOperationQuery({ filter: v.filter }) }, options);
