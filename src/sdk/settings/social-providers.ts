import { socialProvidersGet } from "../../funcs/settings/socialProvidersGet.js";
import { socialProvidersList } from "../../funcs/settings/socialProvidersList.js";
import { socialProvidersCreateLink } from "../../funcs/settings/socialProvidersCreateLink.js";
import { socialProviderUsersExchangeAccessCode } from "../../funcs/settings/socialProviderUsersExchangeAccessCode.js";
import { socialProviderUsersList } from "../../funcs/settings/socialProviderUsersList.js";
import { socialProviderUsersGet } from "../../funcs/settings/socialProviderUsersGet.js";
import { socialProviderUsersUpdate } from "../../funcs/settings/socialProviderUsersUpdate.js";
import { socialProviderUsersDelete } from "../../funcs/settings/socialProviderUsersDelete.js";
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

    /**
     * Create social provider redirect link.
     */
    async createLink(
        request: operations.CreateSocialProviderLinkRequest,
        options?: RequestOptions,
    ): Promise<operations.CreateSocialProviderLinkResponse> {
        return unwrapAsync(socialProvidersCreateLink(
            this,
            request,
            options,
        ));
    }

    /**
     * Exchange social provider access code.
     */
    async exchangeAccessCode(
        request: operations.ExchangeSocialProviderAccessCodeRequest,
        options?: RequestOptions,
    ): Promise<operations.ExchangeSocialProviderAccessCodeResponse> {
        return unwrapAsync(socialProviderUsersExchangeAccessCode(
            this,
            request,
            options,
        ));
    }

    /**
     * List social provider users.
     */
    async listUsers(
        request: operations.ListSocialProviderUsersRequest,
        options?: RequestOptions,
    ): Promise<operations.ListSocialProviderUsersResponse> {
        return unwrapAsync(socialProviderUsersList(
            this,
            request,
            options,
        ));
    }

    /**
     * Get social provider user.
     */
    async getUser(
        request: operations.GetSocialProviderUserRequest,
        options?: RequestOptions,
    ): Promise<operations.GetSocialProviderUserResponse> {
        return unwrapAsync(socialProviderUsersGet(
            this,
            request,
            options,
        ));
    }

    /**
     * Update social provider user.
     */
    async updateUser(
        request: operations.UpdateSocialProviderUserRequest,
        options?: RequestOptions,
    ): Promise<operations.UpdateSocialProviderUserResponse> {
        return unwrapAsync(socialProviderUsersUpdate(
            this,
            request,
            options,
        ));
    }

    /**
     * Delete social provider user.
     */
    async deleteUser(
        request: operations.DeleteSocialProviderUserRequest,
        options?: RequestOptions,
    ): Promise<operations.DeleteSocialProviderUserResponse> {
        return unwrapAsync(socialProviderUsersDelete(
            this,
            request,
            options,
        ));
    }
}
