/*
 * Users SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import { usersCreate } from "../../funcs/users/usersCreate.js";
import { usersGet } from "../../funcs/users/usersGet.js";
import { usersIssueToken } from "../../funcs/users/usersIssueToken.js";
import { usersList } from "../../funcs/users/usersList.js";
import { usersUpdate } from "../../funcs/users/usersUpdate.js";
import { usersSendPasswordResetLink } from "../../funcs/users/usersSendPasswordResetLink.js";
import { usersResetPassword } from "../../funcs/users/usersResetPassword.js";
import { UserCustomers } from "./customers.js";
import { UserLogins } from "./logins.js";
import { UserMfaMethods } from "./mfa-methods.js";
import { UserOAuthAccounts } from "./oauth-accounts.js";
import { UserRecoveryCodes } from "./recovery-codes.js";

export class Users extends ClientSDK {
  private _logins?: UserLogins;
  private _customers?: UserCustomers;
  private _oauthAccounts?: UserOAuthAccounts;
  private _mfaMethods?: UserMfaMethods;
  private _recoveryCodes?: UserRecoveryCodes;

  get logins(): UserLogins {
    return (this._logins ??= new UserLogins(this._options));
  }

  get customers(): UserCustomers {
    return (this._customers ??= new UserCustomers(this._options));
  }

  get oauthAccounts(): UserOAuthAccounts {
    return (this._oauthAccounts ??= new UserOAuthAccounts(this._options));
  }

  get mfaMethods(): UserMfaMethods {
    return (this._mfaMethods ??= new UserMfaMethods(this._options));
  }

  get recoveryCodes(): UserRecoveryCodes {
    return (this._recoveryCodes ??= new UserRecoveryCodes(this._options));
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

  async issueToken(
    request: operations.IssueUserAccessTokenRequest,
    options?: RequestOptions,
  ): Promise<operations.IssueUserAccessTokenResponse> {
    return unwrapAsync(usersIssueToken(
      this,
      request,
      options,
    ));
  }

  async sendPasswordResetLink(
    request: operations.SendPasswordResetLinkRequest,
    options?: RequestOptions,
  ): Promise<operations.SendPasswordResetLinkResponse> {
    return unwrapAsync(usersSendPasswordResetLink(
      this,
      request,
      options,
    ));
  }

  async resetPassword(
    request: operations.ResetPasswordRequest,
    options?: RequestOptions,
  ): Promise<operations.ResetPasswordResponse> {
    return unwrapAsync(usersResetPassword(
      this,
      request,
      options,
    ));
  }

  protected override _propagateLanguage(language: string | undefined): void {
    this._logins?.setLanguage(language);
    this._customers?.setLanguage(language);
    this._oauthAccounts?.setLanguage(language);
    this._mfaMethods?.setLanguage(language);
    this._recoveryCodes?.setLanguage(language);
  }
}
