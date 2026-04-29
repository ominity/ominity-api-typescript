/*
 * Social Provider User model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type SocialProviderUser = {
    resource: "socialprovider_user";
    id: number;
    providerId: number;
    userId?: number | null;
    identifier?: string;
    name?: string;
    email?: string | null;
    avatar?: string | null;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const SocialProviderUser$inboundSchema: z.ZodType<SocialProviderUser> = z.object({
    resource: z.literal("socialprovider_user"),
    id: z.number().int(),
    providerId: z.number().int(),
    userId: z.number().int().nullable().optional(),
    identifier: z.string().optional(),
    name: z.string().optional(),
    email: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as SocialProviderUser;
});
