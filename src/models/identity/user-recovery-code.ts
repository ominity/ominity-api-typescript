/*
 * User Recovery Code model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type UserRecoveryCode = {
    resource: "user_recovery_code";
    userId: number;
    code: string;
    isUsed: boolean;
    usedAt?: string | null;
    createdAt: string;
    updatedAt: string;
    links?: HalLinks;
};

/** @internal */
export const UserRecoveryCode$inboundSchema: z.ZodType<UserRecoveryCode> = z.object({
    resource: z.literal("user_recovery_code"),
    userId: z.number().int(),
    code: z.string(),
    isUsed: z.boolean(),
    usedAt: z.string().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as UserRecoveryCode;
});
