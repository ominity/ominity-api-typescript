/*
 * User passkey model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

/** A passkey a user signs in with. Key material is never returned. */
export type UserPasskey = {
  resource: "user_passkey";
  id: number;
  userId: number;
  name: string;
  /** The passkey provider (iCloud Keychain, Google Password Manager, …) when known. */
  authenticator?: string | null | undefined;
  /** Synced between the user's devices by their provider. */
  isSynced: boolean;
  transports: Array<string>;
  /** The domain (WebAuthn RP ID) the passkey works on. */
  rpId: string;
  /** The channel the passkey was added on. */
  channelId?: number | null | undefined;
  lastUsedAt?: string | null | undefined;
  lastUsedChannelId?: number | null | undefined;
  createdAt?: string | null | undefined;
  links?: HalLinks | undefined;
};

/** @internal */
export const UserPasskey$inboundSchema: z.ZodType<UserPasskey> = z.object({
  resource: z.literal("user_passkey"),
  id: z.number().int(),
  userId: z.number().int(),
  name: z.string(),
  authenticator: z.string().nullable().optional(),
  isSynced: z.boolean(),
  transports: z.array(z.string()).default([]),
  rpId: z.string(),
  channelId: z.number().int().nullable().optional(),
  lastUsedAt: z.string().nullable().optional(),
  lastUsedChannelId: z.number().int().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => {
  return remap$(v, {
    "_links": "links",
  }) as UserPasskey;
});

/**
 * WebAuthn options as JSON, ready for `PublicKeyCredential.parseCreationOptionsFromJSON()` or
 * `PublicKeyCredential.parseRequestOptionsFromJSON()` (binary fields are base64url strings).
 */
export type PasskeyOptionsJSON = {
  challenge: string;
  rpId?: string | undefined;
  rp?: { id?: string | undefined; name: string } | undefined;
  user?: { id: string; name: string; displayName: string } | undefined;
  allowCredentials?: Array<PasskeyCredentialDescriptorJSON> | undefined;
  excludeCredentials?: Array<PasskeyCredentialDescriptorJSON> | undefined;
  userVerification?: string | undefined;
  timeout?: number | undefined;
  [key: string]: unknown;
};

export type PasskeyCredentialDescriptorJSON = {
  type: "public-key";
  id: string;
  transports?: Array<string> | undefined;
};

/** @internal */
export const PasskeyOptionsJSON$inboundSchema: z.ZodType<PasskeyOptionsJSON> = z.object({
  challenge: z.string(),
}).loose() as unknown as z.ZodType<PasskeyOptionsJSON>;
