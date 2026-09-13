import { customerSubscriptionsCreate, customerSubscriptionsDelete, customerSubscriptionsGet, customerSubscriptionsGetTransitionProduct, customerSubscriptionsList, customerSubscriptionsListTransitionProducts, customerSubscriptionsRenew, customerSubscriptionsUpdate } from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class CustomerSubscriptions extends ClientSDK {
  async list(request: operations.ListCustomerSubscriptionsRequest, options?: RequestOptions): Promise<operations.ListCustomerSubscriptionsResponse> { return unwrapAsync(customerSubscriptionsList(this, request, options)); }
  async get(request: operations.GetCustomerSubscriptionRequest, options?: RequestOptions): Promise<operations.GetCustomerSubscriptionResponse> { return unwrapAsync(customerSubscriptionsGet(this, request, options)); }
  async create(request: operations.CreateCustomerSubscriptionRequest, options?: RequestOptions): Promise<operations.CreateCustomerSubscriptionResponse> { return unwrapAsync(customerSubscriptionsCreate(this, request, options)); }
  async update(request: operations.UpdateCustomerSubscriptionRequest, options?: RequestOptions): Promise<operations.UpdateCustomerSubscriptionResponse> { return unwrapAsync(customerSubscriptionsUpdate(this, request, options)); }
  async delete(request: operations.DeleteCustomerSubscriptionRequest, options?: RequestOptions): Promise<void> { return unwrapAsync(customerSubscriptionsDelete(this, request, options)); }
  async renew(request: operations.RenewCustomerSubscriptionRequest, options?: RequestOptions): Promise<operations.RenewCustomerSubscriptionResponse> { return unwrapAsync(customerSubscriptionsRenew(this, request, options)); }
  async listTransitionProducts(request: operations.ListCustomerSubscriptionTransitionProductsRequest, options?: RequestOptions): Promise<operations.ListCustomerSubscriptionTransitionProductsResponse> { return unwrapAsync(customerSubscriptionsListTransitionProducts(this, request, options)); }
  async getTransitionProduct(request: operations.GetCustomerSubscriptionTransitionProductRequest, options?: RequestOptions): Promise<operations.GetCustomerSubscriptionTransitionProductResponse> { return unwrapAsync(customerSubscriptionsGetTransitionProduct(this, request, options)); }
}
