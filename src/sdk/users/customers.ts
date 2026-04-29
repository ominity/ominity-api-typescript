/*
 * User customers SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import { usersListCustomers } from "../../funcs/users/usersListCustomers.js";

export class UserCustomers extends ClientSDK {
  async list(
    request: operations.ListUserCustomersRequest,
    options?: RequestOptions,
  ): Promise<operations.ListUserCustomersResponse> {
    return unwrapAsync(usersListCustomers(
      this,
      request,
      options,
    ));
  }
}
