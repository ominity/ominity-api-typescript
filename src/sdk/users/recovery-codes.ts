/*
 * User recovery codes SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import { usersListRecoveryCodes } from "../../funcs/users/usersListRecoveryCodes.js";
import { usersRegenerateRecoveryCodes } from "../../funcs/users/usersRegenerateRecoveryCodes.js";
import { usersValidateRecoveryCode } from "../../funcs/users/usersValidateRecoveryCode.js";

export class UserRecoveryCodes extends ClientSDK {
  async list(
    request: operations.ListUserRecoveryCodesRequest,
    options?: RequestOptions,
  ): Promise<operations.ListUserRecoveryCodesResponse> {
    return unwrapAsync(usersListRecoveryCodes(
      this,
      request,
      options,
    ));
  }

  async regenerate(
    request: operations.RegenerateRecoveryCodesRequest,
    options?: RequestOptions,
  ): Promise<operations.RegenerateRecoveryCodesResponse> {
    return unwrapAsync(usersRegenerateRecoveryCodes(
      this,
      request,
      options,
    ));
  }

  async validate(
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
