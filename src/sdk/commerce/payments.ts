/*
 * Commerce Payments SDK.
 */

import { paymentsGet } from "../../funcs/commerce/paymentsGet.js";
import { paymentsCreate, paymentsList } from "../../funcs/commerce/paymentsMutations.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Payments extends ClientSDK {
    async list(request: operations.ListPaymentsRequest = {}, options?: RequestOptions): Promise<operations.ListPaymentsResponse> {
        return unwrapAsync(paymentsList(this, request, options));
    }

    async create(request: operations.CreatePaymentRequest, options?: RequestOptions): Promise<operations.CreatePaymentResponse> {
        return unwrapAsync(paymentsCreate(this, request, options));
    }

    /**
     * Get payment.
     */
    async get(
        id: string,
        options?: RequestOptions & { include?: string },
    ): Promise<operations.GetPaymentResponse> {
        return unwrapAsync(paymentsGet(
            this,
            { id, include: options?.include },
            options,
        ));
    }
}
