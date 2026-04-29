/*
 * OAuth2 functions.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { encodeJSON, encodeSimple } from "../../lib/encodings.js";
import * as M from "../../lib/matchers.js";
import { safeParse } from "../../lib/schemas.js";
import { baseURLWithoutAPIVersion } from "../../lib/url.js";
import * as errors from "../../models/errors/index.js";
import { SDKValidationError } from "../../models/errors/sdk-validation-error.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../../models/errors/http-client-errors.js";
import * as operations from "../../models/operations/index.js";
import type { Result } from "../../types/fp.js";

type OAuth2FunctionError =
  | errors.OminityError
  | SDKValidationError
  | UnexpectedClientError
  | InvalidRequestError
  | RequestAbortedError
  | RequestTimeoutError
  | ConnectionError;

function resolveOAuth2BaseURL(
  client: ClientSDK,
  options?: RequestOptions,
): URL | undefined {
  return baseURLWithoutAPIVersion(
    options?.serverURL ?? client._baseURL,
    client._options.apiVersion,
  );
}

async function resolveOAuth2Request(
  client: ClientSDK,
  operationID: string,
  method: string,
  path: string,
  options: RequestOptions | undefined,
  input: {
    query?: string | undefined;
    headers?: Headers | undefined;
    body?: BodyInit | null | undefined;
  },
): Promise<
  Result<
    { req: Request; response: Response; context: Record<string, unknown> },
    OAuth2FunctionError
  >
> {
  const baseURL = resolveOAuth2BaseURL(client, options);
  const security = null;

  const context = {
    operationID,
    oAuth2Scopes: [],
    securitySource: client._options.security,
    baseURL: (baseURL ?? client._baseURL)?.toString() ?? "",
    retryConfig: options?.retries || client._options.retryConfig || { strategy: "none" },
    resolvedSecurity: security,
    options,
  };

  const requestRes = client._createRequest(
    context,
    {
      security,
      method,
      path,
      headers: input.headers ?? new Headers(options?.headers),
      query: input.query ?? "",
      body: input.body ?? null,
      timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
      baseURL,
    },
    options,
  );
  if (!requestRes.ok) {
    return requestRes;
  }
  const req = requestRes.value;

  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "403", "404", "422", "4XX", "500", "5XX"],
    retryConfig: options?.retries || client._options.retryConfig || { strategy: "none" },
    retryCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
  });
  if (!doResult.ok) {
    return doResult;
  }

  return {
    ok: true,
    value: {
      req,
      response: doResult.value,
      context,
    },
  };
}

/**
 * Issue OAuth2 token.
 */
export async function oauth2IssueToken(
  client: ClientSDK,
  request: operations.IssueOAuth2TokenRequest,
  options?: RequestOptions,
): Promise<Result<operations.IssueOAuth2TokenResponse, OAuth2FunctionError>> {
  const parsed = safeParse(
    request,
    (value) => operations.IssueOAuth2TokenRequest$outboundSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const body = encodeJSON("body", parsed.value, { explode: true });
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.issueToken",
    "POST",
    "/oauth2/token",
    options,
    {
      headers,
      body,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.IssueOAuth2TokenResponse,
    OAuth2FunctionError
  >(
    M.json(200, operations.IssueOAuth2TokenResponse$inboundSchema),
    M.fail(["400", "401", "403", "404", "422", "4XX", "500", "5XX"]),
  )(response, req);

  return result;
}

/**
 * Refresh transient token cookie.
 */
export async function oauth2RefreshTransientTokenCookie(
  client: ClientSDK,
  request?: operations.RefreshTransientTokenCookieRequest | undefined,
  options?: RequestOptions,
): Promise<
  Result<operations.RefreshTransientTokenCookieResponse, OAuth2FunctionError>
> {
  const parsed = safeParse(
    request,
    (value) =>
      operations.RefreshTransientTokenCookieRequest$outboundSchema.optional()
        .parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const headers = new Headers({
    Accept: "text/plain",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.refreshTransientTokenCookie",
    "POST",
    "/oauth2/token/refresh",
    options,
    {
      headers,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.RefreshTransientTokenCookieResponse,
    OAuth2FunctionError
  >(
    M.text(200, operations.RefreshTransientTokenCookieResponse$inboundSchema),
    M.fail(["401", "4XX", "5XX"]),
  )(response, req);

  return result;
}

/**
 * List authorized OAuth2 tokens.
 */
export async function oauth2ListAuthorizedTokens(
  client: ClientSDK,
  request?: operations.ListAuthorizedTokensRequest | undefined,
  options?: RequestOptions,
): Promise<Result<operations.ListAuthorizedTokensResponse, OAuth2FunctionError>> {
  const parsed = safeParse(
    request,
    (value) => operations.ListAuthorizedTokensRequest$outboundSchema.optional().parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const headers = new Headers({
    Accept: "application/json",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.listAuthorizedTokens",
    "GET",
    "/oauth2/tokens",
    options,
    {
      headers,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.ListAuthorizedTokensResponse,
    OAuth2FunctionError
  >(
    M.json(200, operations.ListAuthorizedTokensResponse$inboundSchema),
    M.fail(["401", "4XX", "5XX"]),
  )(response, req);

  return result;
}

/**
 * Revoke authorized OAuth2 token.
 */
export async function oauth2RevokeAuthorizedToken(
  client: ClientSDK,
  request: operations.RevokeAuthorizedTokenRequest,
  options?: RequestOptions,
): Promise<Result<operations.RevokeAuthorizedTokenResponse, OAuth2FunctionError>> {
  const parsed = safeParse(
    request,
    (value) => operations.RevokeAuthorizedTokenRequest$outboundSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const path = encodeSimple(
    "/oauth2/tokens/{token_id}",
    { token_id: parsed.value.token_id },
    { explode: false, charEncoding: "percent" },
  ) || "";

  const headers = new Headers({
    Accept: "application/json",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.revokeAuthorizedToken",
    "DELETE",
    path,
    options,
    {
      headers,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.RevokeAuthorizedTokenResponse,
    OAuth2FunctionError
  >(
    M.nil(204, operations.RevokeAuthorizedTokenResponse$inboundSchema),
    M.fail(["401", "404", "4XX", "5XX"]),
  )(response, req);

  return result;
}

/**
 * List OAuth2 clients.
 */
export async function oauth2ListClients(
  client: ClientSDK,
  request?: operations.ListOAuthClientsRequest | undefined,
  options?: RequestOptions,
): Promise<Result<operations.ListOAuthClientsResponse, OAuth2FunctionError>> {
  const parsed = safeParse(
    request,
    (value) => operations.ListOAuthClientsRequest$outboundSchema.optional().parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const headers = new Headers({
    Accept: "application/json",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.listClients",
    "GET",
    "/oauth2/clients",
    options,
    {
      headers,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.ListOAuthClientsResponse,
    OAuth2FunctionError
  >(
    M.json(200, operations.ListOAuthClientsResponse$inboundSchema),
    M.fail(["401", "4XX", "5XX"]),
  )(response, req);

  return result;
}

/**
 * Create OAuth2 client.
 */
export async function oauth2CreateClient(
  client: ClientSDK,
  request: operations.CreateOAuthClientRequest,
  options?: RequestOptions,
): Promise<Result<operations.CreateOAuthClientResponse, OAuth2FunctionError>> {
  const parsed = safeParse(
    request,
    (value) => operations.CreateOAuthClientRequest$outboundSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const body = encodeJSON("body", parsed.value, { explode: true });
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.createClient",
    "POST",
    "/oauth2/clients",
    options,
    {
      headers,
      body,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.CreateOAuthClientResponse,
    OAuth2FunctionError
  >(
    M.json(200, operations.CreateOAuthClientResponse$inboundSchema),
    M.json(201, operations.CreateOAuthClientResponse$inboundSchema),
    M.fail(["401", "4XX", "5XX"]),
  )(response, req);

  return result;
}

/**
 * Update OAuth2 client.
 */
export async function oauth2UpdateClient(
  client: ClientSDK,
  request: operations.UpdateOAuthClientRequest,
  options?: RequestOptions,
): Promise<Result<operations.UpdateOAuthClientResponse, OAuth2FunctionError>> {
  const parsed = safeParse(
    request,
    (value) => operations.UpdateOAuthClientRequest$outboundSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const body = encodeJSON("body", {
    name: parsed.value.name,
    redirect: parsed.value.redirect,
  }, { explode: true });

  const path = encodeSimple(
    "/oauth2/clients/{client_id}",
    { client_id: parsed.value.client_id },
    { explode: false, charEncoding: "percent" },
  ) || "";

  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.updateClient",
    "PUT",
    path,
    options,
    {
      headers,
      body,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.UpdateOAuthClientResponse,
    OAuth2FunctionError
  >(
    M.json(200, operations.UpdateOAuthClientResponse$inboundSchema),
    M.fail(["401", "404", "4XX", "5XX"]),
  )(response, req);

  return result;
}

/**
 * Delete OAuth2 client.
 */
export async function oauth2DeleteClient(
  client: ClientSDK,
  request: operations.DeleteOAuthClientRequest,
  options?: RequestOptions,
): Promise<Result<operations.DeleteOAuthClientResponse, OAuth2FunctionError>> {
  const parsed = safeParse(
    request,
    (value) => operations.DeleteOAuthClientRequest$outboundSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const path = encodeSimple(
    "/oauth2/clients/{client_id}",
    { client_id: parsed.value.client_id },
    { explode: false, charEncoding: "percent" },
  ) || "";

  const headers = new Headers({
    Accept: "application/json",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.deleteClient",
    "DELETE",
    path,
    options,
    {
      headers,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.DeleteOAuthClientResponse,
    OAuth2FunctionError
  >(
    M.nil(204, operations.DeleteOAuthClientResponse$inboundSchema),
    M.fail(["401", "404", "4XX", "5XX"]),
  )(response, req);

  return result;
}

/**
 * List OAuth2 scopes.
 */
export async function oauth2ListScopes(
  client: ClientSDK,
  request?: operations.ListOAuthScopesRequest | undefined,
  options?: RequestOptions,
): Promise<Result<operations.ListOAuthScopesResponse, OAuth2FunctionError>> {
  const parsed = safeParse(
    request,
    (value) => operations.ListOAuthScopesRequest$outboundSchema.optional().parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const headers = new Headers({
    Accept: "application/json",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.listScopes",
    "GET",
    "/oauth2/scopes",
    options,
    {
      headers,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.ListOAuthScopesResponse,
    OAuth2FunctionError
  >(
    M.json(200, operations.ListOAuthScopesResponse$inboundSchema),
    M.fail(["401", "4XX", "5XX"]),
  )(response, req);

  return result;
}

/**
 * List OAuth2 personal access tokens.
 */
export async function oauth2ListPersonalAccessTokens(
  client: ClientSDK,
  request?: operations.ListPersonalAccessTokensRequest | undefined,
  options?: RequestOptions,
): Promise<
  Result<operations.ListPersonalAccessTokensResponse, OAuth2FunctionError>
> {
  const parsed = safeParse(
    request,
    (value) =>
      operations.ListPersonalAccessTokensRequest$outboundSchema.optional()
        .parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const headers = new Headers({
    Accept: "application/json",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.listPersonalAccessTokens",
    "GET",
    "/oauth2/personal-access-tokens",
    options,
    {
      headers,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.ListPersonalAccessTokensResponse,
    OAuth2FunctionError
  >(
    M.json(200, operations.ListPersonalAccessTokensResponse$inboundSchema),
    M.fail(["401", "4XX", "5XX"]),
  )(response, req);

  return result;
}

/**
 * Create OAuth2 personal access token.
 */
export async function oauth2CreatePersonalAccessToken(
  client: ClientSDK,
  request: operations.CreatePersonalAccessTokenRequest,
  options?: RequestOptions,
): Promise<
  Result<operations.CreatePersonalAccessTokenResponse, OAuth2FunctionError>
> {
  const parsed = safeParse(
    request,
    (value) => operations.CreatePersonalAccessTokenRequest$outboundSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const body = encodeJSON("body", parsed.value, { explode: true });
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.createPersonalAccessToken",
    "POST",
    "/oauth2/personal-access-tokens",
    options,
    {
      headers,
      body,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.CreatePersonalAccessTokenResponse,
    OAuth2FunctionError
  >(
    M.json(200, operations.CreatePersonalAccessTokenResponse$inboundSchema),
    M.json(201, operations.CreatePersonalAccessTokenResponse$inboundSchema),
    M.fail(["401", "4XX", "5XX"]),
  )(response, req);

  return result;
}

/**
 * Delete OAuth2 personal access token.
 */
export async function oauth2DeletePersonalAccessToken(
  client: ClientSDK,
  request: operations.DeletePersonalAccessTokenRequest,
  options?: RequestOptions,
): Promise<
  Result<operations.DeletePersonalAccessTokenResponse, OAuth2FunctionError>
> {
  const parsed = safeParse(
    request,
    (value) => operations.DeletePersonalAccessTokenRequest$outboundSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }

  const path = encodeSimple(
    "/oauth2/personal-access-tokens/{token_id}",
    { token_id: parsed.value.token_id },
    { explode: false, charEncoding: "percent" },
  ) || "";

  const headers = new Headers({
    Accept: "application/json",
  });

  const requestResult = await resolveOAuth2Request(
    client,
    "oauth2.deletePersonalAccessToken",
    "DELETE",
    path,
    options,
    {
      headers,
    },
  );
  if (!requestResult.ok) {
    return requestResult;
  }
  const { req, response } = requestResult.value;

  const [result] = await M.match<
    operations.DeletePersonalAccessTokenResponse,
    OAuth2FunctionError
  >(
    M.nil(204, operations.DeletePersonalAccessTokenResponse$inboundSchema),
    M.fail(["401", "404", "4XX", "5XX"]),
  )(response, req);

  return result;
}
