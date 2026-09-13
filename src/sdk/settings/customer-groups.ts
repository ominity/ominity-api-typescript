import { settingCustomerGroupsGet, settingCustomerGroupsList } from "../../funcs/settings/customerGroups.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class CustomerGroups extends ClientSDK {
  async list(request: operations.ListSettingCustomerGroupsRequest = {}, options?: RequestOptions): Promise<operations.ListSettingCustomerGroupsResponse> { return unwrapAsync(settingCustomerGroupsList(this, request, options)); }
  async get(request: operations.GetSettingCustomerGroupRequest, options?: RequestOptions): Promise<operations.GetSettingCustomerGroupResponse> { return unwrapAsync(settingCustomerGroupsGet(this, request, options)); }
}
