import { customerPaymentsCreate, customerPaymentsDelete, customerPaymentsGet, customerPaymentsList } from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class CustomerPayments extends ClientSDK {
  async list(request: operations.ListCustomerPaymentsRequest, options?: RequestOptions): Promise<operations.ListCustomerPaymentsResponse> { return unwrapAsync(customerPaymentsList(this, request, options)); }
  async get(request: operations.GetCustomerPaymentRequest, options?: RequestOptions): Promise<operations.GetCustomerPaymentResponse> { return unwrapAsync(customerPaymentsGet(this, request, options)); }
  async create(request: operations.CreateCustomerPaymentRequest, options?: RequestOptions): Promise<operations.CreateCustomerPaymentResponse> { return unwrapAsync(customerPaymentsCreate(this, request, options)); }
  async delete(request: operations.DeleteCustomerPaymentRequest, options?: RequestOptions): Promise<void> { return unwrapAsync(customerPaymentsDelete(this, request, options)); }
}
