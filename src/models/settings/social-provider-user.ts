/*
 * Social Provider User model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type SocialProviderUser = {
    resource: "socialprovider_user";
    id: number;
    userId: number;
    provider: string;
    identifier?: string;
    name?: string;
    avatar?: string | null;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const SocialProviderUser$inboundSchema: z.ZodType<SocialProviderUser> = z.object({
    resource: z.literal("socialprovider_user"),
    id: z.number().int(),
    userId: z.number().int(),
    provider: z.string(),
    identifier: z.string().optional(),
    name: z.string().optional(),
    avatar: z.string().nullable().optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as SocialProviderUser;
});
