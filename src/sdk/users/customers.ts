/*
 * User customers SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import { usersListCustomers } from "../../funcs/users/usersListCustomers.js";
import { usersGetCustomer } from "../../funcs/users/usersGetCustomer.js";

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

  async get(
    request: operations.GetUserCustomerRequest,
    options?: RequestOptions,
  ): Promise<operations.GetUserCustomerResponse> {
    return unwrapAsync(usersGetCustomer(
      this,
      request,
      options,
    ));
  }
}
