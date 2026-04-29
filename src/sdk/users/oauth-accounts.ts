/*
 * User OAuth accounts SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import { usersListOAuthAccounts } from "../../funcs/users/usersListOAuthAccounts.js";

export class UserOAuthAccounts extends ClientSDK {
  async list(
    request: operations.ListUserOAuthAccountsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListUserOAuthAccountsResponse> {
    return unwrapAsync(usersListOAuthAccounts(
      this,
      request,
      options,
    ));
  }
}
