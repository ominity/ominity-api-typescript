/*
 * Customer user role model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type CustomerUserRole = {
    resource: "customer_user_role";
    id: number;
    key: string;
    name: string;
    description: string;
    nameTranslations: Record<string, string>;
    descriptionTranslations: Record<string, string | null>;
    permissions: Array<string>;
    isSystem: boolean;
    isAssignable: boolean;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const CustomerUserRole$inboundSchema: z.ZodType<CustomerUserRole> = z.object({
    resource: z.literal("customer_user_role"),
    id: z.number().int(),
    key: z.string(),
    name: z.string(),
    description: z.string(),
    nameTranslations: z.record(z.string(), z.string()),
    descriptionTranslations: z.record(z.string(), z.string().nullable()),
    permissions: z.array(z.string()),
    isSystem: z.boolean(),
    isAssignable: z.boolean(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => remap$(v, {
    "_links": "links",
}) as CustomerUserRole);
