/*
 * Admins SDK.
 */

import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import { unwrapAsync } from "../types/fp.js";
import * as operations from "../models/operations/index.js";
import { adminsGet } from "../funcs/admins/adminsGet.js";
import { adminsList } from "../funcs/admins/adminsList.js";

export class Admins extends ClientSDK {
    async list(
        request?: operations.ListAdminsRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListAdminsResponse> {
        return unwrapAsync(adminsList(
            this,
            request,
            options,
        ));
    }

    async get(
        request: operations.GetAdminRequest,
        options?: RequestOptions,
    ): Promise<operations.GetAdminResponse> {
        return unwrapAsync(adminsGet(
            this,
            request,
            options,
        ));
    }
}
