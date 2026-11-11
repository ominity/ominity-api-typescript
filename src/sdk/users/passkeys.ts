/*
 * User passkeys SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import {
  userPasskeysCreate,
  userPasskeysCreateChallenge,
  userPasskeysDelete,
  userPasskeysGet,
  userPasskeysList,
  userPasskeysUpdate,
} from "../../funcs/users/userPasskeys.js";

export class UserPasskeys extends ClientSDK {
  async list(
    request: operations.ListUserPasskeysRequest,
    options?: RequestOptions,
  ): Promise<operations.ListUserPasskeysResponse> {
    return unwrapAsync(userPasskeysList(this, request, options));
  }

  async get(
    request: operations.GetUserPasskeyRequest,
    options?: RequestOptions,
  ): Promise<operations.GetUserPasskeyResponse> {
    return unwrapAsync(userPasskeysGet(this, request, options));
  }

  /** Start adding a passkey: options for `navigator.credentials.create()`. */
  async createChallenge(
    request: operations.CreateUserPasskeyChallengeRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateUserPasskeyChallengeResponse> {
    return unwrapAsync(userPasskeysCreateChallenge(this, request, options));
  }

  /** Finish adding a passkey with the browser's answer. */
  async create(
    request: operations.CreateUserPasskeyRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateUserPasskeyResponse> {
    return unwrapAsync(userPasskeysCreate(this, request, options));
  }

  async update(
    request: operations.UpdateUserPasskeyRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateUserPasskeyResponse> {
    return unwrapAsync(userPasskeysUpdate(this, request, options));
  }

  async delete(
    request: operations.DeleteUserPasskeyRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteUserPasskeyResponse> {
    return unwrapAsync(userPasskeysDelete(this, request, options));
  }
}
