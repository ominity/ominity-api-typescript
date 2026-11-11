/*
 * User passkeys: sign-in challenges and passkey management.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { executeOperation } from "../../lib/operation.js";
import * as operations from "../../models/operations/index.js";

const id = (value: number | string) => encodeURIComponent(String(value));

/**
 * Start a passkey sign-in: a challenge for `navigator.credentials.get()`. With `email`, answers `hasPasskeys` first
 * (no challenge when false). Exchange the browser's answer with `oauth2.token` and `grant_type: "passkey"`.
 */
export const usersCreatePasskeySignInChallenge = (client: ClientSDK, request: operations.CreatePasskeySignInChallengeRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "users.createPasskeySignInChallenge", method: "POST", path: () => "/users/passkeys/challenge", requestSchema: operations.CreatePasskeySignInChallengeRequest$outboundSchema, responseSchema: operations.CreatePasskeySignInChallengeResponse$inboundSchema, body: (v) => v, successStatus: 200 }, options);

export const userPasskeysList = (client: ClientSDK, request: operations.ListUserPasskeysRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "users.passkeys.list", method: "GET", path: (v) => `/users/${id(v.userId)}/passkeys`, requestSchema: operations.ListUserPasskeysRequest$outboundSchema, responseSchema: operations.ListUserPasskeysResponse$inboundSchema }, options);

export const userPasskeysGet = (client: ClientSDK, request: operations.GetUserPasskeyRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "users.passkeys.get", method: "GET", path: (v) => `/users/${id(v.userId)}/passkeys/${id(v.id)}`, requestSchema: operations.GetUserPasskeyRequest$outboundSchema, responseSchema: operations.GetUserPasskeyResponse$inboundSchema }, options);

/** Start adding a passkey: a challenge for `navigator.credentials.create()`. */
export const userPasskeysCreateChallenge = (client: ClientSDK, request: operations.CreateUserPasskeyChallengeRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "users.passkeys.createChallenge", method: "POST", path: (v) => `/users/${id(v.userId)}/passkeys/challenge`, requestSchema: operations.CreateUserPasskeyChallengeRequest$outboundSchema, responseSchema: operations.CreateUserPasskeyChallengeResponse$inboundSchema, body: ({ userId: _userId, ...body }) => body, successStatus: 200 }, options);

/** Finish adding a passkey with the browser's answer to the challenge. */
export const userPasskeysCreate = (client: ClientSDK, request: operations.CreateUserPasskeyRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "users.passkeys.create", method: "POST", path: (v) => `/users/${id(v.userId)}/passkeys`, requestSchema: operations.CreateUserPasskeyRequest$outboundSchema, responseSchema: operations.CreateUserPasskeyResponse$inboundSchema, body: ({ userId: _userId, ...body }) => body, successStatus: 201 }, options);

export const userPasskeysUpdate = (client: ClientSDK, request: operations.UpdateUserPasskeyRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "users.passkeys.update", method: "PATCH", path: (v) => `/users/${id(v.userId)}/passkeys/${id(v.id)}`, requestSchema: operations.UpdateUserPasskeyRequest$outboundSchema, responseSchema: operations.UpdateUserPasskeyResponse$inboundSchema, body: (v) => ({ name: v.name }) }, options);

export const userPasskeysDelete = (client: ClientSDK, request: operations.DeleteUserPasskeyRequest, options?: RequestOptions) => executeOperation(client, request, { operationID: "users.passkeys.delete", method: "DELETE", path: (v) => `/users/${id(v.userId)}/passkeys/${id(v.id)}`, requestSchema: operations.DeleteUserPasskeyRequest$outboundSchema, responseSchema: operations.DeleteUserPasskeyResponse$inboundSchema, responseType: "void", successStatus: 204 }, options);
