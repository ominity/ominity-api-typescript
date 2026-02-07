/*
 * Commerce Shipping Methods SDK.
 */

import { shippingMethodsList } from "../../funcs/commerce/shippingMethodsList.js";
import { shippingMethodsGet } from "../../funcs/commerce/shippingMethodsGet.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class ShippingMethods extends ClientSDK {
    /**
     * List shipping methods.
     */
    async list(
        request?: operations.ListShippingMethodsRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListShippingMethodsResponse> {
        return unwrapAsync(shippingMethodsList(
            this,
            request,
            options,
        ));
    }

    /**
     * Get shipping method.
     */
    async get(
        id: string,
        options?: RequestOptions & { include?: string },
    ): Promise<operations.GetShippingMethodResponse> {
        return unwrapAsync(shippingMethodsGet(
            this,
            { id, include: options?.include },
            options,
        ));
    }
}
