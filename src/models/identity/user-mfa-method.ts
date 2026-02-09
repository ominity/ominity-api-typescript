/*
 * User MFA Method model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type UserMfaMethod = {
    resource: "user_mfa_method";
    userId: number;
    method: string;
    isEnabled: boolean;
    verifiedAt?: string | null;
    lastUsedAt?: string | null;
    lastSentAt?: string | null;
    links?: HalLinks;
};

/** @internal */
export const UserMfaMethod$inboundSchema: z.ZodType<UserMfaMethod> = z.object({
    resource: z.literal("user_mfa_method"),
    userId: z.number().int(),
    method: z.string(),
    isEnabled: z.boolean(),
    verifiedAt: z.string().nullable().optional(),
    lastUsedAt: z.string().nullable().optional(),
    lastSentAt: z.string().nullable().optional(),
    _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as UserMfaMethod;
});
