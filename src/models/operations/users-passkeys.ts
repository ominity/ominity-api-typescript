/*
 * User passkey operations (WebAuthn sign-in and passkey management).
 */

import * as z from "zod/v4";
import { HalLinks$inboundSchema } from "../hal.js";
import {
  PasskeyOptionsJSON,
  PasskeyOptionsJSON$inboundSchema,
  UserPasskey,
  UserPasskey$inboundSchema,
} from "../identity/user-passkey.js";
import { buildPaginated, Paginated } from "../pagination.js";

/** `PublicKeyCredential.toJSON()` from the browser, as an object or a JSON string. */
export type PasskeyCredentialJSON = Record<string, unknown> | string;

export type CreatePasskeySignInChallengeRequest = {
  /** The origin of the page that runs the ceremony; it must be one of the channel's domains. */
  origin: string;
  /** The email the user typed (email-first sign-in): the answer says whether it has passkeys here. */
  email?: string | null | undefined;
  /** The visitor's IP address, for rate limiting. */
  ipAddress?: string | null | undefined;
  /** The visitor's user agent. */
  userAgent?: string | null | undefined;
};

export type CreatePasskeySignInChallengeResponse = {
  /**
   * Set when an email was given. `false` comes without a challenge: the email has no passkeys for this site (or no
   * account; the answer is the same).
   */
  hasPasskeys?: boolean | undefined;
  challengeId?: string | undefined;
  expiresAt?: string | undefined;
  /** For `navigator.credentials.get({ publicKey })`. */
  publicKey?: PasskeyOptionsJSON | undefined;
};

/** @internal */
export const CreatePasskeySignInChallengeRequest$outboundSchema: z.ZodType<CreatePasskeySignInChallengeRequest> = z.object({
  origin: z.string(),
  email: z.string().nullable().optional(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
});

/** @internal */
export const CreatePasskeySignInChallengeResponse$inboundSchema: z.ZodType<CreatePasskeySignInChallengeResponse> = z.object({
  hasPasskeys: z.boolean().optional(),
  challengeId: z.string().optional(),
  expiresAt: z.string().optional(),
  publicKey: PasskeyOptionsJSON$inboundSchema.optional(),
}).loose();

export type ListUserPasskeysRequest = {
  /** User ID. */
  userId: number;
};

export type ListUserPasskeysResponse = Paginated<UserPasskey>;

/** @internal */
export const ListUserPasskeysRequest$outboundSchema: z.ZodType<ListUserPasskeysRequest> = z.object({
  userId: z.number(),
});

/** @internal */
export const ListUserPasskeysResponse$inboundSchema: z.ZodType<ListUserPasskeysResponse> = z.object({
  _embedded: z.object({
    user_passkeys: z.array(UserPasskey$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) => buildPaginated(v._embedded.user_passkeys, v.count, v._links));

export type GetUserPasskeyRequest = {
  userId: number;
  /** Passkey ID. */
  id: number;
};

export type GetUserPasskeyResponse = UserPasskey;

/** @internal */
export const GetUserPasskeyRequest$outboundSchema: z.ZodType<GetUserPasskeyRequest> = z.object({
  userId: z.number(),
  id: z.number(),
});

/** @internal */
export const GetUserPasskeyResponse$inboundSchema: z.ZodType<GetUserPasskeyResponse> = UserPasskey$inboundSchema;

export type CreateUserPasskeyChallengeRequest = {
  userId: number;
  /** The origin of the page that runs the ceremony; it must be one of the channel's domains. */
  origin: string;
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
};

export type CreateUserPasskeyChallengeResponse = {
  challengeId: string;
  expiresAt: string;
  /** For `navigator.credentials.create({ publicKey })`. */
  publicKey: PasskeyOptionsJSON;
};

/** @internal */
export const CreateUserPasskeyChallengeRequest$outboundSchema: z.ZodType<CreateUserPasskeyChallengeRequest> = z.object({
  userId: z.number(),
  origin: z.string(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
});

/** @internal */
export const CreateUserPasskeyChallengeResponse$inboundSchema: z.ZodType<CreateUserPasskeyChallengeResponse> = z.object({
  challengeId: z.string(),
  expiresAt: z.string(),
  publicKey: PasskeyOptionsJSON$inboundSchema,
}).loose();

export type CreateUserPasskeyRequest = {
  userId: number;
  /** The `challengeId` from `users.passkeys.createChallenge`. */
  challengeId: string;
  /** The browser's `PublicKeyCredential.toJSON()` from `navigator.credentials.create()`. */
  credential: PasskeyCredentialJSON;
  /** A name; defaults to the provider's name or "Passkey". */
  name?: string | null | undefined;
};

export type CreateUserPasskeyResponse = UserPasskey;

/** @internal */
export const CreateUserPasskeyRequest$outboundSchema: z.ZodType<CreateUserPasskeyRequest> = z.object({
  userId: z.number(),
  challengeId: z.string(),
  credential: z.union([z.record(z.string(), z.unknown()), z.string()]),
  name: z.string().nullable().optional(),
});

/** @internal */
export const CreateUserPasskeyResponse$inboundSchema: z.ZodType<CreateUserPasskeyResponse> = UserPasskey$inboundSchema;

export type UpdateUserPasskeyRequest = {
  userId: number;
  id: number;
  name: string;
};

export type UpdateUserPasskeyResponse = UserPasskey;

/** @internal */
export const UpdateUserPasskeyRequest$outboundSchema: z.ZodType<UpdateUserPasskeyRequest> = z.object({
  userId: z.number(),
  id: z.number(),
  name: z.string(),
});

/** @internal */
export const UpdateUserPasskeyResponse$inboundSchema: z.ZodType<UpdateUserPasskeyResponse> = UserPasskey$inboundSchema;

export type DeleteUserPasskeyRequest = {
  userId: number;
  id: number;
};

export type DeleteUserPasskeyResponse = void;

/** @internal */
export const DeleteUserPasskeyRequest$outboundSchema: z.ZodType<DeleteUserPasskeyRequest> = GetUserPasskeyRequest$outboundSchema;

/** @internal */
export const DeleteUserPasskeyResponse$inboundSchema: z.ZodType<void> = z.void();
