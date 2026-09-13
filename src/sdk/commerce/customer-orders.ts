import { customerOrdersCreate, customerOrdersDelete, customerOrdersGet, customerOrdersList, customerOrdersUpdate } from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class CustomerOrders extends ClientSDK {
  async list(request: operations.ListCustomerOrdersRequest, options?: RequestOptions): Promise<operations.ListCustomerOrdersResponse> { return unwrapAsync(customerOrdersList(this, request, options)); }
  async get(request: operations.GetCustomerOrderRequest, options?: RequestOptions): Promise<operations.GetCustomerOrderResponse> { return unwrapAsync(customerOrdersGet(this, request, options)); }
  async create(request: operations.CreateCustomerOrderRequest, options?: RequestOptions): Promise<operations.CreateCustomerOrderResponse> { return unwrapAsync(customerOrdersCreate(this, request, options)); }
  async update(request: operations.UpdateCustomerOrderRequest, options?: RequestOptions): Promise<operations.UpdateCustomerOrderResponse> { return unwrapAsync(customerOrdersUpdate(this, request, options)); }
  async delete(request: operations.DeleteCustomerOrderRequest, options?: RequestOptions): Promise<void> { return unwrapAsync(customerOrdersDelete(this, request, options)); }
}
