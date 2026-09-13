import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

export const pageComponentsGet = (client: ClientSDK, request: operations.GetPageComponentRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "cms.pages.getComponent", method: "GET", path: (v) => `/cms/pages/${v.pageId}/components/${v.id}`, requestSchema: operations.GetPageComponentRequest$outboundSchema, responseSchema: operations.GetPageComponentResponse$inboundSchema }, options);
export const pageComponentFieldsGet = (client: ClientSDK, request: operations.GetPageComponentFieldRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "cms.pages.getComponentField", method: "GET", path: (v) => `/cms/pages/${v.pageId}/components/${v.pageComponentId}/fields/${v.id}`, requestSchema: operations.GetPageComponentFieldRequest$outboundSchema, responseSchema: operations.GetPageComponentFieldResponse$inboundSchema }, options);
