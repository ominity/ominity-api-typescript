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
    /** Setup details of an `authenticator` method that is not verified yet. */
    details?: {
        /** The QR code as an image data URI (`data:image/svg+xml;base64,…`), usable as an `<img>` source. */
        qrCode?: string | undefined;
        /** The `otpauth://` link the QR code holds; open it to add the account on the same device. */
        uri?: string | undefined;
        /** The secret, for entering the account by hand. */
        secret?: string | undefined;
    } | undefined;
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
    details: z.object({
        qrCode: z.string().optional(),
        uri: z.string().optional(),
        secret: z.string().optional(),
    }).optional(),
    _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as UserMfaMethod;
});
