/*
 * User Recovery Code model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type UserRecoveryCode = {
    resource: "user_recovery_code";
    id: number;
    code: string;
    usedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    links?: HalLinks;
};

/** @internal */
export const UserRecoveryCode$inboundSchema: z.ZodType<UserRecoveryCode> = z.object({
    resource: z.literal("user_recovery_code"),
    id: z.number().int(),
    code: z.string(),
    usedAt: z.string().nullable().optional(),
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
    _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as UserRecoveryCode;
});
