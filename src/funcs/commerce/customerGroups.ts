import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { encodeOperationQuery, executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

export const customerGroupsList = (client: ClientSDK, request: operations.ListCustomerGroupsRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "commerce.customerGroups.list", method: "GET", path: (v) => `/commerce/customers/${v.customerId}/groups`, requestSchema: operations.ListCustomerGroupsRequest$outboundSchema, responseSchema: operations.ListCustomerGroupsResponse$inboundSchema, query: encodeOperationQuery }, options);
export const customerGroupsGet = (client: ClientSDK, request: operations.GetCustomerGroupRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "commerce.customerGroups.get", method: "GET", path: (v) => `/commerce/customers/${v.customerId}/groups/${v.id}`, requestSchema: operations.GetCustomerGroupRequest$outboundSchema, responseSchema: operations.GetCustomerGroupResponse$inboundSchema, query: encodeOperationQuery }, options);
