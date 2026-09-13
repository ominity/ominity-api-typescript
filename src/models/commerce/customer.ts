/*
 * Commerce customer model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Address, Address$inboundSchema } from "./address.js";

export type Customer = {
    resource: "customer";
    id: number;
    type: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    companyVat: string | null;
    billingAddress: Address | null;
    shippingAddress: Address | null;
    isTaxExempt: boolean;
    isGuest: boolean;
    ownerId: number | null;
    customFields?: Record<string, unknown> | Array<unknown>;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const Customer$inboundSchema: z.ZodType<Customer> = z.object({
    resource: z.literal("customer"),
    id: z.number().int(),
    type: z.string(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    companyVat: z.string().nullable(),
    billingAddress: Address$inboundSchema.nullable(),
    shippingAddress: Address$inboundSchema.nullable(),
    isTaxExempt: z.boolean(),
    isGuest: z.boolean(),
    ownerId: z.number().int().nullable(),
    customFields: z.union([z.record(z.string(), z.unknown()), z.array(z.unknown())]).optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => remap$(v, {
    "_links": "links",
}) as Customer);
