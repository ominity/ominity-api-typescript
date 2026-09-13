import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { encodeOperationQuery, executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

export const shippingClassesList = (client: ClientSDK, request: operations.ListShippingClassesRequest = {}, options?: RequestOptions) => executeOperation(client, request, { operationID: "commerce.shippingClasses.list", method: "GET", path: () => "/commerce/shipping-classes", requestSchema: operations.ListShippingClassesRequest$outboundSchema, responseSchema: operations.ListShippingClassesResponse$inboundSchema, query: encodeOperationQuery }, options);
export const shippingClassesGet = (client: ClientSDK, request: operations.GetShippingClassRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "commerce.shippingClasses.get", method: "GET", path: (v) => `/commerce/shipping-classes/${v.id}`, requestSchema: operations.GetShippingClassRequest$outboundSchema, responseSchema: operations.GetShippingClassResponse$inboundSchema }, options);
