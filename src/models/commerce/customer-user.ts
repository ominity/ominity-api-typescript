/*
 * Customer User model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type CustomerUser = {
    resource: "customer_user";
    userId: number;
    customerId: number;
    roleId: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string | null;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const CustomerUser$inboundSchema: z.ZodType<CustomerUser> = z.object({
    resource: z.literal("customer_user"),
    userId: z.number().int(),
    customerId: z.number().int(),
    roleId: z.number().int(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    avatar: z.string().nullable().optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as CustomerUser;
});
