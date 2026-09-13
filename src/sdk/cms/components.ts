/*
 * CMS Components SDK.
 */

import { componentsList } from "../../funcs/cms/componentsList.js";
import { componentsGet } from "../../funcs/cms/componentsGet.js";
import { componentFieldsGet, componentFieldsList } from "../../funcs/cms/componentFields.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Components extends ClientSDK {
    async list(
        request?: operations.ListComponentsRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListComponentsResponse> {
        return unwrapAsync(componentsList(this, request, options));
    }

    async get(
        request: operations.GetComponentRequest,
        options?: RequestOptions,
    ): Promise<operations.GetComponentResponse> {
        return unwrapAsync(componentsGet(this, request, options));
    }

    async listFields(request: operations.ListComponentFieldsRequest, options?: RequestOptions): Promise<operations.ListComponentFieldsResponse> {
        return unwrapAsync(componentFieldsList(this, request, options));
    }

    async getField(request: operations.GetComponentFieldRequest, options?: RequestOptions): Promise<operations.GetComponentFieldResponse> {
        return unwrapAsync(componentFieldsGet(this, request, options));
    }
}
