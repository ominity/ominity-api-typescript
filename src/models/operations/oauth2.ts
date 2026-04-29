/*
 * OAuth2 operations.
 */

import * as z from "zod/v4";
import {
  OAuth2AuthorizedToken,
  OAuth2AuthorizedToken$inboundSchema,
  OAuth2Client,
  OAuth2Client$inboundSchema,
  OAuth2IssuedToken,
  OAuth2IssuedToken$inboundSchema,
  OAuth2PersonalAccessTokenResult,
  OAuth2PersonalAccessTokenResult$inboundSchema,
  OAuth2Scope,
  OAuth2Scope$inboundSchema,
} from "../identity/oauth2.js";

export type IssueOAuth2TokenRequest = {
  grant_type: string;
  client_id: string;
  client_secret: string;
  username?: string | undefined;
  password?: string | undefined;
  scope?: string | undefined;
  refresh_token?: string | undefined;
  code?: string | undefined;
  redirect_uri?: string | undefined;
  code_verifier?: string | undefined;
};

export type IssueOAuth2TokenResponse = OAuth2IssuedToken;

/** @internal */
export const IssueOAuth2TokenRequest$outboundSchema: z.ZodType<
  IssueOAuth2TokenRequest
> = z.object({
  grant_type: z.string(),
  client_id: z.string(),
  client_secret: z.string(),
  username: z.string().optional(),
  password: z.string().optional(),
  scope: z.string().optional(),
  refresh_token: z.string().optional(),
  code: z.string().optional(),
  redirect_uri: z.string().optional(),
  code_verifier: z.string().optional(),
}).loose();

/** @internal */
export const IssueOAuth2TokenResponse$inboundSchema: z.ZodType<
  IssueOAuth2TokenResponse
> = OAuth2IssuedToken$inboundSchema;

export type RefreshTransientTokenCookieRequest = {};
export type RefreshTransientTokenCookieResponse = string;

/** @internal */
export const RefreshTransientTokenCookieRequest$outboundSchema: z.ZodType<
  RefreshTransientTokenCookieRequest
> = z.object({});

/** @internal */
export const RefreshTransientTokenCookieResponse$inboundSchema: z.ZodType<
  RefreshTransientTokenCookieResponse
> = z.string();

export type ListAuthorizedTokensRequest = {};
export type ListAuthorizedTokensResponse = Array<OAuth2AuthorizedToken>;

/** @internal */
export const ListAuthorizedTokensRequest$outboundSchema: z.ZodType<
  ListAuthorizedTokensRequest
> = z.object({});

/** @internal */
export const ListAuthorizedTokensResponse$inboundSchema: z.ZodType<
  ListAuthorizedTokensResponse
> = z.array(OAuth2AuthorizedToken$inboundSchema);

export type RevokeAuthorizedTokenRequest = {
  token_id: string;
};

export type RevokeAuthorizedTokenResponse = void;

/** @internal */
export const RevokeAuthorizedTokenRequest$outboundSchema: z.ZodType<
  RevokeAuthorizedTokenRequest
> = z.object({
  token_id: z.string(),
});

/** @internal */
export const RevokeAuthorizedTokenResponse$inboundSchema: z.ZodType<
  RevokeAuthorizedTokenResponse
> = z.void();

export type ListOAuthClientsRequest = {};
export type ListOAuthClientsResponse = Array<OAuth2Client>;

/** @internal */
export const ListOAuthClientsRequest$outboundSchema: z.ZodType<
  ListOAuthClientsRequest
> = z.object({});

/** @internal */
export const ListOAuthClientsResponse$inboundSchema: z.ZodType<
  ListOAuthClientsResponse
> = z.array(OAuth2Client$inboundSchema);

export type CreateOAuthClientRequest = {
  name: string;
  redirect: string;
  confidential?: boolean | undefined;
};

export type CreateOAuthClientResponse = OAuth2Client;

/** @internal */
export const CreateOAuthClientRequest$outboundSchema: z.ZodType<
  CreateOAuthClientRequest
> = z.object({
  name: z.string(),
  redirect: z.string(),
  confidential: z.boolean().optional(),
});

/** @internal */
export const CreateOAuthClientResponse$inboundSchema: z.ZodType<
  CreateOAuthClientResponse
> = OAuth2Client$inboundSchema;

export type UpdateOAuthClientRequest = {
  client_id: string;
  name: string;
  redirect: string;
};

export type UpdateOAuthClientResponse = OAuth2Client;

/** @internal */
export const UpdateOAuthClientRequest$outboundSchema: z.ZodType<
  UpdateOAuthClientRequest
> = z.object({
  client_id: z.string(),
  name: z.string(),
  redirect: z.string(),
});

/** @internal */
export const UpdateOAuthClientResponse$inboundSchema: z.ZodType<
  UpdateOAuthClientResponse
> = OAuth2Client$inboundSchema;

export type DeleteOAuthClientRequest = {
  client_id: string;
};

export type DeleteOAuthClientResponse = void;

/** @internal */
export const DeleteOAuthClientRequest$outboundSchema: z.ZodType<
  DeleteOAuthClientRequest
> = z.object({
  client_id: z.string(),
});

/** @internal */
export const DeleteOAuthClientResponse$inboundSchema: z.ZodType<
  DeleteOAuthClientResponse
> = z.void();

export type ListOAuthScopesRequest = {};
export type ListOAuthScopesResponse = Array<OAuth2Scope>;

/** @internal */
export const ListOAuthScopesRequest$outboundSchema: z.ZodType<
  ListOAuthScopesRequest
> = z.object({});

/** @internal */
export const ListOAuthScopesResponse$inboundSchema: z.ZodType<
  ListOAuthScopesResponse
> = z.array(OAuth2Scope$inboundSchema);

export type ListPersonalAccessTokensRequest = {};
export type ListPersonalAccessTokensResponse = Array<OAuth2AuthorizedToken>;

/** @internal */
export const ListPersonalAccessTokensRequest$outboundSchema: z.ZodType<
  ListPersonalAccessTokensRequest
> = z.object({});

/** @internal */
export const ListPersonalAccessTokensResponse$inboundSchema: z.ZodType<
  ListPersonalAccessTokensResponse
> = z.array(OAuth2AuthorizedToken$inboundSchema);

export type CreatePersonalAccessTokenRequest = {
  name: string;
  scopes?: Array<string> | undefined;
};

export type CreatePersonalAccessTokenResponse = OAuth2PersonalAccessTokenResult;

/** @internal */
export const CreatePersonalAccessTokenRequest$outboundSchema: z.ZodType<
  CreatePersonalAccessTokenRequest
> = z.object({
  name: z.string(),
  scopes: z.array(z.string()).optional(),
});

/** @internal */
export const CreatePersonalAccessTokenResponse$inboundSchema: z.ZodType<
  CreatePersonalAccessTokenResponse
> = OAuth2PersonalAccessTokenResult$inboundSchema;

export type DeletePersonalAccessTokenRequest = {
  token_id: string;
};

export type DeletePersonalAccessTokenResponse = void;

/** @internal */
export const DeletePersonalAccessTokenRequest$outboundSchema: z.ZodType<
  DeletePersonalAccessTokenRequest
> = z.object({
  token_id: z.string(),
});

/** @internal */
export const DeletePersonalAccessTokenResponse$inboundSchema: z.ZodType<
  DeletePersonalAccessTokenResponse
> = z.void();
