import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { encodeOperationQuery, executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

export const customersList = (client: ClientSDK, request: operations.ListCustomersRequest = {}, options?: RequestOptions) => executeOperation(client, request, {
  operationID: "commerce.customers.list", method: "GET", path: () => "/commerce/customers", requestSchema: operations.ListCustomersRequest$outboundSchema, responseSchema: operations.ListCustomersResponse$inboundSchema, query: encodeOperationQuery,
}, options);
export const customersGet = (client: ClientSDK, request: operations.GetCustomerRequest, options?: RequestOptions) => executeOperation(client, request, {
  operationID: "commerce.customers.get", method: "GET", path: (value) => `/commerce/customers/${value.id}`, requestSchema: operations.GetCustomerRequest$outboundSchema, responseSchema: operations.GetCustomerResponse$inboundSchema, query: (value) => encodeOperationQuery(value),
}, options);
export const customersCreate = (client: ClientSDK, request: operations.CreateCustomerRequest, options?: RequestOptions) => executeOperation(client, request, {
  operationID: "commerce.customers.create", method: "POST", path: () => "/commerce/customers", requestSchema: operations.CreateCustomerRequest$outboundSchema, responseSchema: operations.CreateCustomerResponse$inboundSchema, body: (value) => value.data,
}, options);
export const customersUpdate = (client: ClientSDK, request: operations.UpdateCustomerRequest, options?: RequestOptions) => executeOperation(client, request, {
  operationID: "commerce.customers.update", method: "PATCH", path: (value) => `/commerce/customers/${value.id}`, requestSchema: operations.UpdateCustomerRequest$outboundSchema, responseSchema: operations.UpdateCustomerResponse$inboundSchema, body: (value) => value.data,
}, options);
