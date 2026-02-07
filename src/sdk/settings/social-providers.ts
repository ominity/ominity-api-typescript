import { socialProvidersGet } from "../../funcs/settings/socialProvidersGet.js";
import { socialProvidersList } from "../../funcs/settings/socialProvidersList.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class SocialProviders extends ClientSDK {
    /**
     * List social providers.
     */
    async list(
        request?: operations.ListSocialProvidersRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListSocialProvidersResponse> {
        return unwrapAsync(socialProvidersList(
            this,
            request,
            options,
        ));
    }

    /**
     * Get social provider.
     */
    async get(
        request: operations.GetSocialProviderRequest,
        options?: RequestOptions,
    ): Promise<operations.GetSocialProviderResponse> {
        return unwrapAsync(socialProvidersGet(
            this,
            request,
            options,
        ));
    }
}
