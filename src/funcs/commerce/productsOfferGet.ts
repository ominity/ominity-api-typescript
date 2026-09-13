import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

export const productsOfferGet = (client: ClientSDK, request: operations.GetProductOfferRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "commerce.products.getOffer", method: "GET", path: (v) => `/commerce/products/${v.productId}/offers/${v.id}`, requestSchema: operations.GetProductOfferRequest$outboundSchema, responseSchema: operations.GetProductOfferResponse$inboundSchema }, options);
