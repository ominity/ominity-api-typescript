import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { encodeOperationQuery, executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

export const settingCustomerGroupsList = (client: ClientSDK, request: operations.ListSettingCustomerGroupsRequest = {}, options?: RequestOptions) => executeOperation(client, request, { operationID: "settings.customerGroups.list", method: "GET", path: () => "/settings/customer-groups", requestSchema: operations.ListSettingCustomerGroupsRequest$outboundSchema, responseSchema: operations.ListSettingCustomerGroupsResponse$inboundSchema, query: encodeOperationQuery }, options);
export const settingCustomerGroupsGet = (client: ClientSDK, request: operations.GetSettingCustomerGroupRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "settings.customerGroups.get", method: "GET", path: (v) => `/settings/customer-groups/${v.id}`, requestSchema: operations.GetSettingCustomerGroupRequest$outboundSchema, responseSchema: operations.GetSettingCustomerGroupResponse$inboundSchema, query: encodeOperationQuery }, options);
