import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { encodeOperationQuery, executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

export const paymentMethodIssuersList = (client: ClientSDK, request: operations.ListPaymentMethodIssuersRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "settings.paymentMethodIssuers.list", method: "GET", path: (v) => `/settings/paymentmethods/${v.methodId}/issuers`, requestSchema: operations.ListPaymentMethodIssuersRequest$outboundSchema, responseSchema: operations.ListPaymentMethodIssuersResponse$inboundSchema, query: encodeOperationQuery }, options);
export const paymentMethodIssuersGet = (client: ClientSDK, request: operations.GetPaymentMethodIssuerRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "settings.paymentMethodIssuers.get", method: "GET", path: (v) => `/settings/paymentmethods/${v.methodId}/issuers/${v.id}`, requestSchema: operations.GetPaymentMethodIssuerRequest$outboundSchema, responseSchema: operations.GetPaymentMethodIssuerResponse$inboundSchema }, options);
