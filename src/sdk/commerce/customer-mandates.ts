import { customerMandatesCreate, customerMandatesDelete, customerMandatesGet, customerMandatesList, customerMandatesUpdate } from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class CustomerMandates extends ClientSDK {
  async list(request: operations.ListCustomerMandatesRequest, options?: RequestOptions): Promise<operations.ListCustomerMandatesResponse> { return unwrapAsync(customerMandatesList(this, request, options)); }
  async get(request: operations.GetCustomerMandateRequest, options?: RequestOptions): Promise<operations.GetCustomerMandateResponse> { return unwrapAsync(customerMandatesGet(this, request, options)); }
  async create(request: operations.CreateCustomerMandateRequest, options?: RequestOptions): Promise<operations.CreateCustomerMandateResponse> { return unwrapAsync(customerMandatesCreate(this, request, options)); }
  async update(request: operations.UpdateCustomerMandateRequest, options?: RequestOptions): Promise<operations.UpdateCustomerMandateResponse> { return unwrapAsync(customerMandatesUpdate(this, request, options)); }
  async delete(request: operations.DeleteCustomerMandateRequest, options?: RequestOptions): Promise<void> { return unwrapAsync(customerMandatesDelete(this, request, options)); }
}
