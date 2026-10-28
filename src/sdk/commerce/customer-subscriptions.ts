import { customerSubscriptionsCancel, customerSubscriptionsCancelChange, customerSubscriptionsConfirmChange, customerSubscriptionsCreate, customerSubscriptionsDelete, customerSubscriptionsGet, customerSubscriptionsGetTransitionProduct, customerSubscriptionsList, customerSubscriptionsListTransitionProducts, customerSubscriptionsListTransitions, customerSubscriptionsQuoteChange, customerSubscriptionsRenew, customerSubscriptionsRevokeCancellation, customerSubscriptionsUpdate } from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class CustomerSubscriptions extends ClientSDK {
  async list(request: operations.ListCustomerSubscriptionsRequest, options?: RequestOptions): Promise<operations.ListCustomerSubscriptionsResponse> { return unwrapAsync(customerSubscriptionsList(this, request, options)); }
  async get(request: operations.GetCustomerSubscriptionRequest, options?: RequestOptions): Promise<operations.GetCustomerSubscriptionResponse> { return unwrapAsync(customerSubscriptionsGet(this, request, options)); }
  async create(request: operations.CreateCustomerSubscriptionRequest, options?: RequestOptions): Promise<operations.CreateCustomerSubscriptionResponse> { return unwrapAsync(customerSubscriptionsCreate(this, request, options)); }
  async update(request: operations.UpdateCustomerSubscriptionRequest, options?: RequestOptions): Promise<operations.UpdateCustomerSubscriptionResponse> { return unwrapAsync(customerSubscriptionsUpdate(this, request, options)); }
  /** Cancels the subscription straight away. Use `cancel` to cancel according to the cancellation policy (notice, minimum term, period end). */
  async delete(request: operations.DeleteCustomerSubscriptionRequest, options?: RequestOptions): Promise<void> { return unwrapAsync(customerSubscriptionsDelete(this, request, options)); }
  async renew(request: operations.RenewCustomerSubscriptionRequest, options?: RequestOptions): Promise<operations.RenewCustomerSubscriptionResponse> { return unwrapAsync(customerSubscriptionsRenew(this, request, options)); }
  /** The plans the customer may change the subscription to, each quoted at the default timing. */
  async listTransitions(request: operations.ListCustomerSubscriptionTransitionsRequest, options?: RequestOptions): Promise<operations.ListCustomerSubscriptionTransitionsResponse> { return unwrapAsync(customerSubscriptionsListTransitions(this, request, options)); }
  /** Quotes a change to another offer. Confirm it with `confirmChange` before `quoteExpiresAt`. */
  async quoteChange(request: operations.QuoteCustomerSubscriptionChangeRequest, options?: RequestOptions): Promise<operations.QuoteCustomerSubscriptionChangeResponse> { return unwrapAsync(customerSubscriptionsQuoteChange(this, request, options)); }
  /** Confirms a quoted change. An immediate upgrade that needs payment returns the order to pay as `orderId` / `links.checkout`. */
  async confirmChange(request: operations.ConfirmCustomerSubscriptionChangeRequest, options?: RequestOptions): Promise<operations.ConfirmCustomerSubscriptionChangeResponse> { return unwrapAsync(customerSubscriptionsConfirmChange(this, request, options)); }
  /** Withdraws a scheduled change, or an immediate upgrade that was not paid yet. */
  async cancelChange(request: operations.CancelCustomerSubscriptionChangeRequest, options?: RequestOptions): Promise<void> { return unwrapAsync(customerSubscriptionsCancelChange(this, request, options)); }
  /** Without `quoteId` quotes the cancellation; with the quote's `id` confirms it. It can be revoked until it takes effect. */
  async cancel(request: operations.CancelCustomerSubscriptionRequest, options?: RequestOptions): Promise<operations.CancelCustomerSubscriptionResponse> { return unwrapAsync(customerSubscriptionsCancel(this, request, options)); }
  /** Revokes a scheduled cancellation; the subscription keeps renewing. */
  async revokeCancellation(request: operations.RevokeCustomerSubscriptionCancellationRequest, options?: RequestOptions): Promise<void> { return unwrapAsync(customerSubscriptionsRevokeCancellation(this, request, options)); }
  /** @deprecated Use `listTransitions`. The server may answer 410 Gone once the legacy endpoints are retired. */
  async listTransitionProducts(request: operations.ListCustomerSubscriptionTransitionProductsRequest, options?: RequestOptions): Promise<operations.ListCustomerSubscriptionTransitionProductsResponse> { return unwrapAsync(customerSubscriptionsListTransitionProducts(this, request, options)); }
  /** @deprecated Use `quoteChange`. The server may answer 410 Gone once the legacy endpoints are retired. */
  async getTransitionProduct(request: operations.GetCustomerSubscriptionTransitionProductRequest, options?: RequestOptions): Promise<operations.GetCustomerSubscriptionTransitionProductResponse> { return unwrapAsync(customerSubscriptionsGetTransitionProduct(this, request, options)); }
}
