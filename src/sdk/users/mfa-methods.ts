/*
 * User MFA methods SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import { usersListMfaMethods } from "../../funcs/users/usersListMfaMethods.js";
import { usersGetMfaMethod } from "../../funcs/users/usersGetMfaMethod.js";
import { usersEnableMfa } from "../../funcs/users/usersEnableMfa.js";
import { usersDisableMfa } from "../../funcs/users/usersDisableMfa.js";
import { usersValidateMfa } from "../../funcs/users/usersValidateMfa.js";
import { usersSendMfa } from "../../funcs/users/usersSendMfa.js";

export class UserMfaMethods extends ClientSDK {
  async list(
    request: operations.ListUserMfaMethodsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListUserMfaMethodsResponse> {
    return unwrapAsync(usersListMfaMethods(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetMfaMethodRequest,
    options?: RequestOptions,
  ): Promise<operations.GetMfaMethodResponse> {
    return unwrapAsync(usersGetMfaMethod(
      this,
      request,
      options,
    ));
  }

  async enable(
    request: operations.EnableMfaRequest,
    options?: RequestOptions,
  ): Promise<operations.EnableMfaResponse> {
    return unwrapAsync(usersEnableMfa(
      this,
      request,
      options,
    ));
  }

  async disable(
    request: operations.DisableMfaRequest,
    options?: RequestOptions,
  ): Promise<operations.DisableMfaResponse> {
    return unwrapAsync(usersDisableMfa(
      this,
      request,
      options,
    ));
  }

  async validate(
    request: operations.ValidateMfaRequest,
    options?: RequestOptions,
  ): Promise<operations.ValidateMfaResponse> {
    return unwrapAsync(usersValidateMfa(
      this,
      request,
      options,
    ));
  }

  async send(
    request: operations.SendMfaRequest,
    options?: RequestOptions,
  ): Promise<operations.SendMfaResponse> {
    return unwrapAsync(usersSendMfa(
      this,
      request,
      options,
    ));
  }
}
