/*
 * Commerce customer user permissions SDK.
 */

import { customerUserPermissionsList } from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class CustomerUserPermissions extends ClientSDK {
  async list(
    options?: RequestOptions,
  ): Promise<operations.ListCustomerUserPermissionsResponse> {
    return unwrapAsync(customerUserPermissionsList(this, {}, options));
  }
}
