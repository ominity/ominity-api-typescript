import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { encodeOperationQuery, executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

export const componentFieldsList = (client: ClientSDK, request: operations.ListComponentFieldsRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "cms.components.listFields", method: "GET", path: (v) => `/cms/components/${v.componentId}/fields`, requestSchema: operations.ListComponentFieldsRequest$outboundSchema, responseSchema: operations.ListComponentFieldsResponse$inboundSchema, query: encodeOperationQuery }, options);
export const componentFieldsGet = (client: ClientSDK, request: operations.GetComponentFieldRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "cms.components.getField", method: "GET", path: (v) => `/cms/components/${v.componentId}/fields/${v.id}`, requestSchema: operations.GetComponentFieldRequest$outboundSchema, responseSchema: operations.GetComponentFieldResponse$inboundSchema }, options);
