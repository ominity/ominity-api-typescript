/*
 * Commerce Shipping Zones operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { ShippingZone, ShippingZone$inboundSchema } from "../commerce/shipping-zone.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListShippingZonesRequest = {
    /**
     * Include related resources.
     */
    include?: string | undefined;
    /**
     * Filter by fields.
     */
    filter?: Record<string, any> | undefined;
    /**
     * Sort by fields.
     */
    sort?: string | undefined;
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListShippingZonesResponse = Paginated<ShippingZone>;

/** @internal */
export const ListShippingZonesRequest$outboundSchema: z.ZodType<
    ListShippingZonesRequest
> = z.object({
    include: z.string().optional(),
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListShippingZonesResponse$inboundSchema: z.ZodType<
    ListShippingZonesResponse
> = z.object({
    _embedded: z.object({
        shipping_zones: z.array(ShippingZone$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.shipping_zones,
        v.count,
        v._links,
    )
) as unknown as z.ZodType<ListShippingZonesResponse>;

export type GetShippingZoneRequest = {
    /**
     * Shipping Zone ID.
     */
    id: string;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetShippingZoneResponse = ShippingZone;

/** @internal */
export const GetShippingZoneRequest$outboundSchema: z.ZodType<
    GetShippingZoneRequest
> = z.object({
    id: z.string(),
    include: z.string().optional(),
});

/** @internal */
export const GetShippingZoneResponse$inboundSchema: z.ZodType<
    GetShippingZoneResponse
> = ShippingZone$inboundSchema;
