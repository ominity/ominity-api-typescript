import { customersCreate, customersGet, customersList, customersUpdate } from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Customers extends ClientSDK {
  async list(request: operations.ListCustomersRequest = {}, options?: RequestOptions): Promise<operations.ListCustomersResponse> { return unwrapAsync(customersList(this, request, options)); }
  async get(request: operations.GetCustomerRequest, options?: RequestOptions): Promise<operations.GetCustomerResponse> { return unwrapAsync(customersGet(this, request, options)); }
  async create(request: operations.CreateCustomerRequest, options?: RequestOptions): Promise<operations.CreateCustomerResponse> { return unwrapAsync(customersCreate(this, request, options)); }
  async update(request: operations.UpdateCustomerRequest, options?: RequestOptions): Promise<operations.UpdateCustomerResponse> { return unwrapAsync(customersUpdate(this, request, options)); }
}
