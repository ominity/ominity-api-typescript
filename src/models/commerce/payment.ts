/*
 * Commerce Payment model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { CurrencyAmount, CurrencyAmount$inboundSchema } from "../common/amount.js";

export type Payment = {
    resource: string;
    id: number;
    customerId: number | null;
    paymentmethodId: number;
    status: string;
    type: string;
    amount: CurrencyAmount;
    description: string;
    invoiceId?: number;
    mandateId?: number;
    details?: Record<string, unknown>;
    expiresAt: string | null;
    completedAt: string | null;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const Payment$inboundSchema: z.ZodType<Payment> = z.object({
    resource: z.string(),
    id: z.number(),
    customerId: z.number().nullable(),
    paymentmethodId: z.number(),
    status: z.string(),
    type: z.string(),
    amount: CurrencyAmount$inboundSchema,
    description: z.string(),
    invoiceId: z.number().optional(),
    mandateId: z.number().optional(),
    details: z.record(z.string(), z.unknown()).optional(),
    expiresAt: z.string().nullable(),
    completedAt: z.string().nullable(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as Payment;
});
