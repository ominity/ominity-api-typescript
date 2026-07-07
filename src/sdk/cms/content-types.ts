/*
 * CMS Content Types SDK.
 */

import { contentTypesList } from "../../funcs/cms/contentTypesList.js";
import { contentTypesGet } from "../../funcs/cms/contentTypesGet.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class ContentTypes extends ClientSDK {
    async list(
        request?: operations.ListContentTypesRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListContentTypesResponse> {
        return unwrapAsync(contentTypesList(this, request, options));
    }

    async get(
        request: operations.GetContentTypeRequest,
        options?: RequestOptions,
    ): Promise<operations.GetContentTypeResponse> {
        return unwrapAsync(contentTypesGet(this, request, options));
    }
}
