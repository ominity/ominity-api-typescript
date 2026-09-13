/*
 * CMS Pages SDK.
 */

import { pagesList } from "../../funcs/cms/pagesList.js";
import { pagesGet } from "../../funcs/cms/pagesGet.js";
import { pagesComponentsList } from "../../funcs/cms/pagesComponentsList.js";
import { pageComponentFieldsGet, pageComponentsGet } from "../../funcs/cms/pageComponents.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Pages extends ClientSDK {
    async list(
        request?: operations.ListPagesRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListPagesResponse> {
        return unwrapAsync(pagesList(this, request, options));
    }

    async get(
        request: operations.GetPageRequest,
        options?: RequestOptions,
    ): Promise<operations.GetPageResponse> {
        return unwrapAsync(pagesGet(this, request, options));
    }

    async listComponents(
        request: operations.ListPageComponentsRequest,
        options?: RequestOptions,
    ): Promise<operations.ListPageComponentsResponse> {
        return unwrapAsync(pagesComponentsList(this, request, options));
    }

    async getComponent(request: operations.GetPageComponentRequest, options?: RequestOptions): Promise<operations.GetPageComponentResponse> {
        return unwrapAsync(pageComponentsGet(this, request, options));
    }

    async getComponentField(request: operations.GetPageComponentFieldRequest, options?: RequestOptions): Promise<operations.GetPageComponentFieldResponse> {
        return unwrapAsync(pageComponentFieldsGet(this, request, options));
    }
}
