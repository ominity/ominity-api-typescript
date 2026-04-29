/*
 * OAuth2 SDK.
 */

import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import { unwrapAsync } from "../types/fp.js";
import * as operations from "../models/operations/index.js";
import {
  oauth2CreateClient,
  oauth2CreatePersonalAccessToken,
  oauth2DeleteClient,
  oauth2DeletePersonalAccessToken,
  oauth2IssueToken,
  oauth2ListAuthorizedTokens,
  oauth2ListClients,
  oauth2ListPersonalAccessTokens,
  oauth2ListScopes,
  oauth2RefreshTransientTokenCookie,
  oauth2RevokeAuthorizedToken,
  oauth2UpdateClient,
} from "../funcs/oauth2/index.js";

export class OAuth2 extends ClientSDK {
  async issueToken(
    request: operations.IssueOAuth2TokenRequest,
    options?: RequestOptions,
  ): Promise<operations.IssueOAuth2TokenResponse> {
    return unwrapAsync(oauth2IssueToken(
      this,
      request,
      options,
    ));
  }

  async refreshTransientTokenCookie(
    request?: operations.RefreshTransientTokenCookieRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.RefreshTransientTokenCookieResponse> {
    return unwrapAsync(oauth2RefreshTransientTokenCookie(
      this,
      request,
      options,
    ));
  }

  async listAuthorizedTokens(
    request?: operations.ListAuthorizedTokensRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListAuthorizedTokensResponse> {
    return unwrapAsync(oauth2ListAuthorizedTokens(
      this,
      request,
      options,
    ));
  }

  async revokeAuthorizedToken(
    request: operations.RevokeAuthorizedTokenRequest,
    options?: RequestOptions,
  ): Promise<operations.RevokeAuthorizedTokenResponse> {
    return unwrapAsync(oauth2RevokeAuthorizedToken(
      this,
      request,
      options,
    ));
  }

  async listClients(
    request?: operations.ListOAuthClientsRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListOAuthClientsResponse> {
    return unwrapAsync(oauth2ListClients(
      this,
      request,
      options,
    ));
  }

  async createClient(
    request: operations.CreateOAuthClientRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateOAuthClientResponse> {
    return unwrapAsync(oauth2CreateClient(
      this,
      request,
      options,
    ));
  }

  async updateClient(
    request: operations.UpdateOAuthClientRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateOAuthClientResponse> {
    return unwrapAsync(oauth2UpdateClient(
      this,
      request,
      options,
    ));
  }

  async deleteClient(
    request: operations.DeleteOAuthClientRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteOAuthClientResponse> {
    return unwrapAsync(oauth2DeleteClient(
      this,
      request,
      options,
    ));
  }

  async listScopes(
    request?: operations.ListOAuthScopesRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListOAuthScopesResponse> {
    return unwrapAsync(oauth2ListScopes(
      this,
      request,
      options,
    ));
  }

  async listPersonalAccessTokens(
    request?: operations.ListPersonalAccessTokensRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListPersonalAccessTokensResponse> {
    return unwrapAsync(oauth2ListPersonalAccessTokens(
      this,
      request,
      options,
    ));
  }

  async createPersonalAccessToken(
    request: operations.CreatePersonalAccessTokenRequest,
    options?: RequestOptions,
  ): Promise<operations.CreatePersonalAccessTokenResponse> {
    return unwrapAsync(oauth2CreatePersonalAccessToken(
      this,
      request,
      options,
    ));
  }

  async deletePersonalAccessToken(
    request: operations.DeletePersonalAccessTokenRequest,
    options?: RequestOptions,
  ): Promise<operations.DeletePersonalAccessTokenResponse> {
    return unwrapAsync(oauth2DeletePersonalAccessToken(
      this,
      request,
      options,
    ));
  }
}
