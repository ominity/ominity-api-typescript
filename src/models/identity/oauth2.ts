/*
 * OAuth2 identity models.
 */

import * as z from "zod/v4";

export type OAuth2IssuedToken = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token?: string | undefined;
};

/** @internal */
export const OAuth2IssuedToken$inboundSchema: z.ZodType<OAuth2IssuedToken> = z
  .object({
    token_type: z.string(),
    expires_in: z.number(),
    access_token: z.string(),
    refresh_token: z.string().optional(),
  })
  .loose();

export type OAuth2Client = {
  id: string | number;
  user_id?: number | null | undefined;
  name?: string | undefined;
  secret?: string | null | undefined;
  provider?: string | null | undefined;
  redirect?: string | undefined;
  personal_access_client?: boolean | undefined;
  password_client?: boolean | undefined;
  revoked?: boolean | undefined;
  created_at?: string | null | undefined;
  updated_at?: string | null | undefined;
  plainSecret?: string | null | undefined;
  grant_types?: Array<string> | undefined;
  scopes?: Array<string> | undefined;
};

/** @internal */
export const OAuth2Client$inboundSchema: z.ZodType<OAuth2Client> = z
  .object({
    id: z.union([z.string(), z.number()]),
    user_id: z.number().nullable().optional(),
    name: z.string().optional(),
    secret: z.string().nullable().optional(),
    provider: z.string().nullable().optional(),
    redirect: z.string().optional(),
    personal_access_client: z.boolean().optional(),
    password_client: z.boolean().optional(),
    revoked: z.boolean().optional(),
    created_at: z.string().nullable().optional(),
    updated_at: z.string().nullable().optional(),
    plainSecret: z.string().nullable().optional(),
    grant_types: z.array(z.string()).optional(),
    scopes: z.array(z.string()).optional(),
  })
  .loose();

export type OAuth2AuthorizedToken = {
  id: string | number;
  user_id?: number | null | undefined;
  client_id?: string | number | null | undefined;
  name?: string | null | undefined;
  scopes?: Array<string> | undefined;
  revoked?: boolean | undefined;
  created_at?: string | null | undefined;
  updated_at?: string | null | undefined;
  expires_at?: string | null | undefined;
  client?: OAuth2Client | undefined;
};

/** @internal */
export const OAuth2AuthorizedToken$inboundSchema: z.ZodType<
  OAuth2AuthorizedToken
> = z.object({
  id: z.union([z.string(), z.number()]),
  user_id: z.number().nullable().optional(),
  client_id: z.union([z.string(), z.number()]).nullable().optional(),
  name: z.string().nullable().optional(),
  scopes: z.array(z.string()).optional(),
  revoked: z.boolean().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  client: OAuth2Client$inboundSchema.optional(),
}).loose();

export type OAuth2Scope = {
  id: string;
  description: string;
};

/** @internal */
export const OAuth2Scope$inboundSchema: z.ZodType<OAuth2Scope> = z.object({
  id: z.string(),
  description: z.string(),
}).loose();

export type OAuth2PersonalAccessTokenResult = {
  accessToken: string;
  token: OAuth2AuthorizedToken;
};

/** @internal */
export const OAuth2PersonalAccessTokenResult$inboundSchema: z.ZodType<
  OAuth2PersonalAccessTokenResult
> = z.object({
  accessToken: z.string().optional(),
  access_token: z.string().optional(),
  token: OAuth2AuthorizedToken$inboundSchema,
}).transform((v) => ({
  accessToken: v.accessToken ?? v.access_token ?? "",
  token: v.token,
}));
