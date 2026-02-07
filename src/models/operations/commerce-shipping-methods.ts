/*
 * Commerce Shipping Methods operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { ShippingMethod, ShippingMethod$inboundSchema } from "../commerce/shipping-method.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListShippingMethodsRequest = {
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

export type ListShippingMethodsResponse = Paginated<ShippingMethod>;

/** @internal */
export const ListShippingMethodsRequest$outboundSchema: z.ZodType<
    ListShippingMethodsRequest
> = z.object({
    include: z.string().optional(),
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListShippingMethodsResponse$inboundSchema: z.ZodType<
    ListShippingMethodsResponse
> = z.object({
    _embedded: z.object({
        shipping_methods: z.array(ShippingMethod$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.shipping_methods,
        v.count,
        v._links,
    )
) as unknown as z.ZodType<ListShippingMethodsResponse>;

export type GetShippingMethodRequest = {
    /**
     * Shipping Method ID.
     */
    id: string;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetShippingMethodResponse = ShippingMethod;

/** @internal */
export const GetShippingMethodRequest$outboundSchema: z.ZodType<
    GetShippingMethodRequest
> = z.object({
    id: z.string(),
    include: z.string().optional(),
});

/** @internal */
export const GetShippingMethodResponse$inboundSchema: z.ZodType<
    GetShippingMethodResponse
> = ShippingMethod$inboundSchema;
