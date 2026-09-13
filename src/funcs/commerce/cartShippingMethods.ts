import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

export const cartShippingMethodsList = (client: ClientSDK, request: operations.ListCartShippingMethodsRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "commerce.carts.listShippingMethods", method: "GET", path: (v) => `/commerce/carts/${v.cartId}/shipping-methods`, requestSchema: operations.ListCartShippingMethodsRequest$outboundSchema, responseSchema: operations.ListCartShippingMethodsResponse$inboundSchema }, options);
