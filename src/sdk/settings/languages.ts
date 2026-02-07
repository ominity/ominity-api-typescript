import { languagesList } from "../../funcs/settings/languagesList.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Languages extends ClientSDK {
    /**
     * List languages.
     */
    async list(
        request?: operations.ListLanguagesRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListLanguagesResponse> {
        return unwrapAsync(languagesList(
            this,
            request,
            options,
        ));
    }
}
