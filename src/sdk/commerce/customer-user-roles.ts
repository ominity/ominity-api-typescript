/*
 * Commerce customer user roles SDK.
 */

import {
  customerUserRolesCreate,
  customerUserRolesDelete,
  customerUserRolesGet,
  customerUserRolesList,
  customerUserRolesUpdate,
} from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class CustomerUserRoles extends ClientSDK {
  async list(
    request: operations.ListCustomerUserRolesRequest = {},
    options?: RequestOptions,
  ): Promise<operations.ListCustomerUserRolesResponse> {
    return unwrapAsync(customerUserRolesList(this, request, options));
  }

  async get(
    request: operations.GetCustomerUserRoleRequest,
    options?: RequestOptions,
  ): Promise<operations.GetCustomerUserRoleResponse> {
    return unwrapAsync(customerUserRolesGet(this, request, options));
  }

  async create(
    request: operations.CreateCustomerUserRoleRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateCustomerUserRoleResponse> {
    return unwrapAsync(customerUserRolesCreate(this, request, options));
  }

  async update(
    request: operations.UpdateCustomerUserRoleRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateCustomerUserRoleResponse> {
    return unwrapAsync(customerUserRolesUpdate(this, request, options));
  }

  async delete(
    request: operations.DeleteCustomerUserRoleRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteCustomerUserRoleResponse> {
    return unwrapAsync(customerUserRolesDelete(this, request, options));
  }
}
