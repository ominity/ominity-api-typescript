import { countriesGet } from "../../funcs/settings/countriesGet.js";
import { countriesList } from "../../funcs/settings/countriesList.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Countries extends ClientSDK {
    /**
     * List countries.
     */
    async list(
        request?: operations.ListCountriesRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListCountriesResponse> {
        return unwrapAsync(countriesList(
            this,
            request,
            options,
        ));
    }

    /**
     * Get country.
     */
    async get(
        request: operations.GetCountryRequest,
        options?: RequestOptions,
    ): Promise<operations.GetCountryResponse> {
        return unwrapAsync(countriesGet(
            this,
            request,
            options,
        ));
    }
}
