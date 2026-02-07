/*
 * Commerce Payments SDK.
 */

import { paymentsGet } from "../../funcs/commerce/paymentsGet.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Payments extends ClientSDK {
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
