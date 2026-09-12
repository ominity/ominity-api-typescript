/*
 * Commerce customer users SDK.
 */

import {
  customerUsersDelete,
  customerUsersGet,
  customerUsersList,
  customerUsersUpdate,
} from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class CustomerUsers extends ClientSDK {
  async list(
    request: operations.ListCustomerUsersRequest,
    options?: RequestOptions,
  ): Promise<operations.ListCustomerUsersResponse> {
    return unwrapAsync(customerUsersList(this, request, options));
  }

  async get(
    request: operations.GetCustomerUserRequest,
    options?: RequestOptions,
  ): Promise<operations.GetCustomerUserResponse> {
    return unwrapAsync(customerUsersGet(this, request, options));
  }

  async update(
    request: operations.UpdateCustomerUserRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateCustomerUserResponse> {
    return unwrapAsync(customerUsersUpdate(this, request, options));
  }

  async delete(
    request: operations.DeleteCustomerUserRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteCustomerUserResponse> {
    return unwrapAsync(customerUsersDelete(this, request, options));
  }
}
