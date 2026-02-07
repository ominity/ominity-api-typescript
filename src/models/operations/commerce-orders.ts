/*
 * Commerce Orders operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Order, Order$inboundSchema } from "../commerce/order.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListOrdersRequest = {
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

export type ListOrdersResponse = Paginated<Order>;

/** @internal */
export const ListOrdersRequest$outboundSchema: z.ZodType<
    ListOrdersRequest
> = z.object({
    include: z.string().optional(),
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListOrdersResponse$inboundSchema: z.ZodType<
    ListOrdersResponse
> = z.object({
    _embedded: z.object({
        orders: z.array(Order$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.orders,
        v.count,
        v._links,
    )
);

export type GetOrderRequest = {
    /**
     * Order ID.
     */
    id: string;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetOrderResponse = Order;

/** @internal */
export const GetOrderRequest$outboundSchema: z.ZodType<
    GetOrderRequest
> = z.object({
    id: z.string(),
    include: z.string().optional(),
});

/** @internal */
export const GetOrderResponse$inboundSchema: z.ZodType<
    GetOrderResponse
> = Order$inboundSchema;

export type CreateOrderRequest = Record<string, any>;
export type CreateOrderResponse = Order;

/** @internal */
export const CreateOrderRequest$outboundSchema: z.ZodType<CreateOrderRequest> = z.record(z.string(), z.any());
/** @internal */
export const CreateOrderResponse$inboundSchema: z.ZodType<CreateOrderResponse> = Order$inboundSchema;

export type UpdateOrderRequest = {
    id: string;
    data: Record<string, any>;
};
export type UpdateOrderResponse = Order;

/** @internal */
export const UpdateOrderRequest$outboundSchema: z.ZodType<UpdateOrderRequest> = z.object({
    id: z.string(),
    data: z.record(z.string(), z.any()),
});
/** @internal */
export const UpdateOrderResponse$inboundSchema: z.ZodType<UpdateOrderResponse> = Order$inboundSchema;
