/*
 * Invoice model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import * as openEnums from "../../types/enums.js";
import { OpenEnum } from "../../types/enums.js";
import { Address, Address$inboundSchema } from "./address.js";
import { CurrencyAmount, CurrencyAmount$inboundSchema } from "../common/amount.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export const InvoiceStatus = {
    Paid: "paid",
    Credited: "credited",
    Open: "open",
    Overdue: "overdue",
    Voided: "voided",
    Draft: "draft",
} as const;
export type InvoiceStatus = OpenEnum<typeof InvoiceStatus>;

export type Invoice = {
    resource: string;
    id: number;
    customerId: number | null;
    number: string;
    status: InvoiceStatus;
    email: string;
    companyName: string | null;
    companyVat: string | null;
    billingAddress: Address;
    subtotalAmount: CurrencyAmount;
    discountAmount: CurrencyAmount;
    vatAmount: CurrencyAmount;
    totalAmount: CurrencyAmount;
    amountPaid: CurrencyAmount;
    isTaxExempt: boolean;
    notes: string;
    invoicedAt: string | null;
    dueAt: string | null;
    paidAt: string | null;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const InvoiceStatus$inboundSchema: z.ZodType<InvoiceStatus, unknown> = openEnums
    .inboundSchema(InvoiceStatus);

/** @internal */
export const Invoice$inboundSchema: z.ZodType<Invoice> = z.object({
    resource: z.string(),
    id: z.number(),
    customerId: z.number().nullable(),
    number: z.string(),
    status: InvoiceStatus$inboundSchema,
    email: z.string(),
    companyName: z.string().nullable(),
    companyVat: z.string().nullable(),
    billingAddress: Address$inboundSchema,
    subtotalAmount: CurrencyAmount$inboundSchema,
    discountAmount: CurrencyAmount$inboundSchema,
    vatAmount: CurrencyAmount$inboundSchema,
    totalAmount: CurrencyAmount$inboundSchema,
    amountPaid: CurrencyAmount$inboundSchema,
    isTaxExempt: z.boolean(),
    notes: z.string(),
    invoicedAt: z.string().nullable(),
    dueAt: z.string().nullable(),
    paidAt: z.string().nullable(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => remap$(v, { _links: "links" }) as Invoice);
