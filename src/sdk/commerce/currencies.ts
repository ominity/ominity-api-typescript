/*
 * Commerce Currencies SDK.
 */

import { currenciesList } from "../../funcs/commerce/currenciesList.js";
import { currenciesGet } from "../../funcs/commerce/currenciesGet.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Currencies extends ClientSDK {
    /**
     * List currencies.
     */
    async list(
        request?: operations.ListCurrenciesRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListCurrenciesResponse> {
        return unwrapAsync(currenciesList(
            this,
            request,
            options,
        ));
    }

    /**
     * Get currency.
     */
    async get(
        code: string,
        options?: RequestOptions,
    ): Promise<operations.GetCurrencyResponse> {
        return unwrapAsync(currenciesGet(
            this,
            { code },
            options,
        ));
    }
}
