/*
 * Commerce Product Groups SDK.
 */

import { productGroupsList } from "../../funcs/commerce/productGroupsList.js";
import { productGroupsGet } from "../../funcs/commerce/productGroupsGet.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class ProductGroups extends ClientSDK {
    async list(
        request?: operations.ListProductGroupsRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListProductGroupsResponse> {
        return unwrapAsync(productGroupsList(this, request, options));
    }

    async get(
        request: operations.GetProductGroupRequest,
        options?: RequestOptions,
    ): Promise<operations.GetProductGroupResponse> {
        return unwrapAsync(productGroupsGet(this, request, options));
    }
}
