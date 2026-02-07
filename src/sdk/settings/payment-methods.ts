import { paymentMethodsGet } from "../../funcs/settings/paymentMethodsGet.js";
import { paymentMethodsList } from "../../funcs/settings/paymentMethodsList.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class PaymentMethods extends ClientSDK {
    /**
     * List payment methods.
     */
    async list(
        request?: operations.ListPaymentMethodsRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListPaymentMethodsResponse> {
        return unwrapAsync(paymentMethodsList(
            this,
            request,
            options,
        ));
    }

    /**
     * Get payment method.
     */
    async get(
        request: operations.GetPaymentMethodRequest,
        options?: RequestOptions,
    ): Promise<operations.GetPaymentMethodResponse> {
        return unwrapAsync(paymentMethodsGet(
            this,
            request,
            options,
        ));
    }
}
