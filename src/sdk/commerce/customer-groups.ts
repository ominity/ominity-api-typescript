import { customerGroupsGet, customerGroupsList } from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class CustomerGroups extends ClientSDK {
  async list(request: operations.ListCustomerGroupsRequest, options?: RequestOptions): Promise<operations.ListCustomerGroupsResponse> { return unwrapAsync(customerGroupsList(this, request, options)); }
  async get(request: operations.GetCustomerGroupRequest, options?: RequestOptions): Promise<operations.GetCustomerGroupResponse> { return unwrapAsync(customerGroupsGet(this, request, options)); }
}
