import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { encodeOperationQuery, executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

export const cmsRoutesList = (client: ClientSDK, request: operations.ListCmsRoutesRequest = {}, options?: RequestOptions) => executeOperation(client, request, { operationID: "cms.routes.list", method: "GET", path: () => "/cms/routes", requestSchema: operations.ListCmsRoutesRequest$outboundSchema, responseSchema: operations.ListCmsRoutesResponse$inboundSchema, query: encodeOperationQuery }, options);
export const cmsRoutesGet = (client: ClientSDK, request: operations.GetCmsRouteRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "cms.routes.get", method: "GET", path: (v) => `/cms/routes/${v.id}`, requestSchema: operations.GetCmsRouteRequest$outboundSchema, responseSchema: operations.GetCmsRouteResponse$inboundSchema }, options);
