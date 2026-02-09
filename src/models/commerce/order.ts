/*
 * Commerce Order model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Address, Address$inboundSchema } from "./address.js";
import { CurrencyAmount, CurrencyAmount$inboundSchema } from "../common/amount.js";

export type ShippingTotals = {
    shippingAmount: CurrencyAmount;
    discountAmount: CurrencyAmount;
    vatAmount: CurrencyAmount;
    totalAmount: CurrencyAmount;
};

export type Order = {
    resource: string;
    id: number;
    customerId: number;
    cartId: string | null;
    channelId: number;
    languageId: number | null;
    number: string;
    invoiceId: number | null;
    status: string;
    companyName: string;
    companyVat: string;
    billingAddress: Address;
    shippingAddress: Address;
    subtotalAmount: CurrencyAmount;
    shipping: ShippingTotals;
    discountAmount: CurrencyAmount;
    vatAmount: CurrencyAmount;
    totalAmount: CurrencyAmount;
    promotionCodes: Array<string>;
    shippingMethodId: number | null;
    isTaxExempt: boolean;
    notes: string;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const ShippingTotals$inboundSchema: z.ZodType<ShippingTotals> = z.object({
    shippingAmount: CurrencyAmount$inboundSchema,
    discountAmount: CurrencyAmount$inboundSchema,
    vatAmount: CurrencyAmount$inboundSchema,
    totalAmount: CurrencyAmount$inboundSchema,
});

/** @internal */
export const Order$inboundSchema: z.ZodType<Order> = z.object({
    resource: z.string(),
    id: z.number(),
    customerId: z.number(),
    cartId: z.string().nullable(),
    channelId: z.number(),
    languageId: z.number().nullable(),
    number: z.string(),
    invoiceId: z.number().nullable(),
    status: z.string(),
    companyName: z.string(),
    companyVat: z.string(),
    billingAddress: Address$inboundSchema,
    shippingAddress: Address$inboundSchema,
    subtotalAmount: CurrencyAmount$inboundSchema,
    shipping: ShippingTotals$inboundSchema,
    discountAmount: CurrencyAmount$inboundSchema,
    vatAmount: CurrencyAmount$inboundSchema,
    totalAmount: CurrencyAmount$inboundSchema,
    promotionCodes: z.array(z.string()),
    shippingMethodId: z.number().nullable(),
    isTaxExempt: z.boolean(),
    notes: z.string(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as Order;
});
