import { paymentMethodIssuersGet, paymentMethodIssuersList } from "../../funcs/settings/paymentMethodIssuers.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class PaymentMethodIssuers extends ClientSDK {
  async list(request: operations.ListPaymentMethodIssuersRequest, options?: RequestOptions): Promise<operations.ListPaymentMethodIssuersResponse> { return unwrapAsync(paymentMethodIssuersList(this, request, options)); }
  async get(request: operations.GetPaymentMethodIssuerRequest, options?: RequestOptions): Promise<operations.GetPaymentMethodIssuerResponse> { return unwrapAsync(paymentMethodIssuersGet(this, request, options)); }
}
