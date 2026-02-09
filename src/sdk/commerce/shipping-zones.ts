/*
 * Commerce Shipping Zones SDK.
 */

import { shippingZonesList } from "../../funcs/commerce/shippingZonesList.js";
import { shippingZonesGet } from "../../funcs/commerce/shippingZonesGet.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class ShippingZones extends ClientSDK {
    /**
     * List shipping zones.
     */
    async list(
        request?: operations.ListShippingZonesRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListShippingZonesResponse> {
        return unwrapAsync(shippingZonesList(
            this,
            request,
            options,
        ));
    }

    /**
     * Get shipping zone.
     */
    async get(
        id: string,
        options?: RequestOptions & { include?: string },
    ): Promise<operations.GetShippingZoneResponse> {
        return unwrapAsync(shippingZonesGet(
            this,
            { id, include: options?.include },
            options,
        ));
    }
}
