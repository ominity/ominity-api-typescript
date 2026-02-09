/*
 * Commerce Payments operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Payment, Payment$inboundSchema } from "../commerce/payment.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListOrderPaymentsRequest = {
    /**
     * Order ID.
     */
    orderId: string;
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

export type ListOrderPaymentsResponse = Paginated<Payment>;

/** @internal */
export const ListOrderPaymentsRequest$outboundSchema: z.ZodType<
    ListOrderPaymentsRequest
> = z.object({
    orderId: z.string(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListOrderPaymentsResponse$inboundSchema: z.ZodType<
    ListOrderPaymentsResponse
> = z.object({
    _embedded: z.object({
        payments: z.array(Payment$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.payments,
        v.count,
        v._links,
    )
);

export type ListPaymentsRequest = {
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

export type ListPaymentsResponse = Paginated<Payment>;

/** @internal */
export const ListPaymentsRequest$outboundSchema: z.ZodType<
    ListPaymentsRequest
> = z.object({
    include: z.string().optional(),
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListPaymentsResponse$inboundSchema: z.ZodType<
    ListPaymentsResponse
> = z.object({
    _embedded: z.object({
        payments: z.array(Payment$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.payments,
        v.count,
        v._links,
    )
);


export type GetPaymentRequest = {
    /**
     * Payment ID.
     */
    id: string;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetPaymentResponse = Payment;

/** @internal */
export const GetPaymentRequest$outboundSchema: z.ZodType<
    GetPaymentRequest
> = z.object({
    id: z.string(),
    include: z.string().optional(),
});

/** @internal */
export const GetPaymentResponse$inboundSchema: z.ZodType<
    GetPaymentResponse
> = Payment$inboundSchema;
