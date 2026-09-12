/*
 * Commerce customer model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type Customer = {
    resource: "customer";
    id: number;
    type: string;
    name: string;
    email: string;
    isGuest: boolean;
    ownerId: number | null;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const Customer$inboundSchema: z.ZodType<Customer> = z.object({
    resource: z.literal("customer"),
    id: z.number().int(),
    type: z.string(),
    name: z.string(),
    email: z.string(),
    isGuest: z.boolean(),
    ownerId: z.number().int().nullable(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => remap$(v, {
    "_links": "links",
}) as Customer);
