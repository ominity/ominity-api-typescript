/*
 * CMS Content SDK.
 */

import { contentList } from "../../funcs/cms/contentList.js";
import { contentGet } from "../../funcs/cms/contentGet.js";
import { contentCreate } from "../../funcs/cms/contentCreate.js";
import { contentUpdate } from "../../funcs/cms/contentUpdate.js";
import { contentDelete } from "../../funcs/cms/contentDelete.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { ContentEntry } from "../../models/cms/content-entry.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Content extends ClientSDK {
    async list<TEntry extends ContentEntry = ContentEntry>(
        request: operations.ListContentRequest,
        options?: RequestOptions,
    ): Promise<operations.ListContentResponse<TEntry>> {
        return unwrapAsync(contentList<TEntry>(this, request, options));
    }

    async get<TEntry extends ContentEntry = ContentEntry>(
        request: operations.GetContentRequest,
        options?: RequestOptions,
    ): Promise<operations.GetContentResponse<TEntry>> {
        return unwrapAsync(contentGet<TEntry>(this, request, options));
    }

    async create<TEntry extends ContentEntry = ContentEntry>(
        request: operations.CreateContentRequest,
        options?: RequestOptions,
    ): Promise<operations.CreateContentResponse<TEntry>> {
        return unwrapAsync(contentCreate<TEntry>(this, request, options));
    }

    async update<TEntry extends ContentEntry = ContentEntry>(
        request: operations.UpdateContentRequest,
        options?: RequestOptions,
    ): Promise<operations.UpdateContentResponse<TEntry>> {
        return unwrapAsync(contentUpdate<TEntry>(this, request, options));
    }

    async delete(
        request: operations.DeleteContentRequest,
        options?: RequestOptions,
    ): Promise<operations.DeleteContentResponse> {
        return unwrapAsync(contentDelete(this, request, options));
    }
}
