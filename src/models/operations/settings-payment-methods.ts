import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { PaymentMethod, PaymentMethod$inboundSchema } from "../settings/payment-method.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListPaymentMethodsRequest = {
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListPaymentMethodsResponse = Paginated<PaymentMethod>;

/** @internal */
export const ListPaymentMethodsRequest$outboundSchema: z.ZodType<
    ListPaymentMethodsRequest
> = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListPaymentMethodsResponse$inboundSchema: z.ZodType<
    ListPaymentMethodsResponse
> = z.object({
    _embedded: z.object({
        paymentmethods: z.array(PaymentMethod$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.paymentmethods,
        v.count,
        v._links,
    )
);

export type GetPaymentMethodRequest = {
    /**
     * Payment Method ID.
     */
    id: number;
};

export type GetPaymentMethodResponse = PaymentMethod;

/** @internal */
export const GetPaymentMethodRequest$outboundSchema: z.ZodType<
    GetPaymentMethodRequest
> = z.object({
    id: z.number(),
});

/** @internal */
export const GetPaymentMethodResponse$inboundSchema: z.ZodType<
    GetPaymentMethodResponse
> = PaymentMethod$inboundSchema;
