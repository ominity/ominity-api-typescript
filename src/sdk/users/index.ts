/*
 * Users SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import { usersCreate } from "../../funcs/users/usersCreate.js";
import { usersGet } from "../../funcs/users/usersGet.js";
import { usersList } from "../../funcs/users/usersList.js";
import { usersUpdate } from "../../funcs/users/usersUpdate.js";
import { usersListCustomers } from "../../funcs/users/usersListCustomers.js";
import { usersListOAuthAccounts } from "../../funcs/users/usersListOAuthAccounts.js";
import { usersListMfaMethods } from "../../funcs/users/usersListMfaMethods.js";
import { usersEnableMfa } from "../../funcs/users/usersEnableMfa.js";
import { usersDisableMfa } from "../../funcs/users/usersDisableMfa.js";
import { usersValidateMfa } from "../../funcs/users/usersValidateMfa.js";
import { usersSendMfa } from "../../funcs/users/usersSendMfa.js";
import { usersListRecoveryCodes } from "../../funcs/users/usersListRecoveryCodes.js";
import { usersRegenerateRecoveryCodes } from "../../funcs/users/usersRegenerateRecoveryCodes.js";
import { usersValidateRecoveryCode } from "../../funcs/users/usersValidateRecoveryCode.js";
import { UserLogins } from "./logins.js";

export class Users extends ClientSDK {
  private _logins?: UserLogins;

  get logins(): UserLogins {
    return (this._logins ??= new UserLogins(this._options));
  }

  async list(
    request?: operations.UsersListParams | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListUsersResponse> {
    return unwrapAsync(usersList(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetUserRequest,
    options?: RequestOptions,
  ): Promise<operations.GetUserResponse> {
    return unwrapAsync(usersGet(
      this,
      request,
      options,
    ));
  }

  async create(
    request: operations.CreateUserRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateUserResponse> {
    return unwrapAsync(usersCreate(
      this,
      request,
      options,
    ));
  }

  async update(
    request: operations.UpdateUserRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateUserResponse> {
    return unwrapAsync(usersUpdate(
      this,
      request,
      options,
    ));
  }

  async listCustomers(
    request: operations.ListUserCustomersRequest,
    options?: RequestOptions,
  ): Promise<operations.ListUserCustomersResponse> {
    return unwrapAsync(usersListCustomers(
      this,
      request,
      options,
    ));
  }

  async listOAuthAccounts(
    request: operations.ListUserOAuthAccountsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListUserOAuthAccountsResponse> {
    return unwrapAsync(usersListOAuthAccounts(
      this,
      request,
      options,
    ));
  }

  async listMfaMethods(
    request: operations.ListUserMfaMethodsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListUserMfaMethodsResponse> {
    return unwrapAsync(usersListMfaMethods(
      this,
      request,
      options,
    ));
  }

  async enableMfa(
    request: operations.EnableMfaRequest,
    options?: RequestOptions,
  ): Promise<operations.EnableMfaResponse> {
    return unwrapAsync(usersEnableMfa(
      this,
      request,
      options,
    ));
  }

  async disableMfa(
    request: operations.DisableMfaRequest,
    options?: RequestOptions,
  ): Promise<operations.DisableMfaResponse> {
    return unwrapAsync(usersDisableMfa(
      this,
      request,
      options,
    ));
  }

  async validateMfa(
    request: operations.ValidateMfaRequest,
    options?: RequestOptions,
  ): Promise<operations.ValidateMfaResponse> {
    return unwrapAsync(usersValidateMfa(
      this,
      request,
      options,
    ));
  }

  async sendMfa(
    request: operations.SendMfaRequest,
    options?: RequestOptions,
  ): Promise<operations.SendMfaResponse> {
    return unwrapAsync(usersSendMfa(
      this,
      request,
      options,
    ));
  }

  async listRecoveryCodes(
    request: operations.ListUserRecoveryCodesRequest,
    options?: RequestOptions,
  ): Promise<operations.ListUserRecoveryCodesResponse> {
    return unwrapAsync(usersListRecoveryCodes(
      this,
      request,
      options,
    ));
  }

  async regenerateRecoveryCodes(
    request: operations.RegenerateRecoveryCodesRequest,
    options?: RequestOptions,
  ): Promise<operations.RegenerateRecoveryCodesResponse> {
    return unwrapAsync(usersRegenerateRecoveryCodes(
      this,
      request,
      options,
    ));
  }

  async validateRecoveryCode(
    request: operations.ValidateRecoveryCodeRequest,
    options?: RequestOptions,
  ): Promise<operations.ValidateRecoveryCodeResponse> {
    return unwrapAsync(usersValidateRecoveryCode(
      this,
      request,
      options,
    ));
  }
}
