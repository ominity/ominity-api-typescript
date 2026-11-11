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
import { usersSendEmailCode } from "../../funcs/users/usersSendEmailCode.js";
import { usersCreatePasskeySignInChallenge } from "../../funcs/users/userPasskeys.js";
import { UserCustomers } from "./customers.js";
import { UserLogins } from "./logins.js";
import { UserMfaMethods } from "./mfa-methods.js";
import { UserOAuthAccounts } from "./oauth-accounts.js";
import { UserPasskeys } from "./passkeys.js";
import { UserRecoveryCodes } from "./recovery-codes.js";

export class Users extends ClientSDK {
  private _logins?: UserLogins;
  private _customers?: UserCustomers;
  private _oauthAccounts?: UserOAuthAccounts;
  private _mfaMethods?: UserMfaMethods;
  private _recoveryCodes?: UserRecoveryCodes;
  private _passkeys?: UserPasskeys;

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

  get passkeys(): UserPasskeys {
    return (this._passkeys ??= new UserPasskeys(this._options));
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

  /**
   * Emails a 6-digit code: a sign-in code when the email has an account, a signup code otherwise (the answer is the
   * same either way). Exchange it with `oauth2.token` and `grant_type=email_code`; a signup code creates the user.
   */
  async sendEmailCode(
    request: operations.SendEmailCodeRequest,
    options?: RequestOptions,
  ): Promise<operations.SendEmailCodeResponse> {
    return unwrapAsync(usersSendEmailCode(
      this,
      request,
      options,
    ));
  }

  /**
   * Starts a passkey sign-in: options for `navigator.credentials.get()`. With `email`, answers `hasPasskeys` first (no
   * challenge when false). Exchange the browser's answer with `oauth2.token` and `grant_type: "passkey"`.
   */
  async createPasskeySignInChallenge(
    request: operations.CreatePasskeySignInChallengeRequest,
    options?: RequestOptions,
  ): Promise<operations.CreatePasskeySignInChallengeResponse> {
    return unwrapAsync(usersCreatePasskeySignInChallenge(
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
    this._passkeys?.setLanguage(language);
  }
}
