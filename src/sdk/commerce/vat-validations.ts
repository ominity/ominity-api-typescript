/*
 * Commerce VAT Validations SDK.
 */

import { vatValidationsGet } from "../../funcs/commerce/vatValidationsGet.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class VatValidations extends ClientSDK {
    /**
     * Validate VAT.
     */
    async get(
        number: string,
        options?: RequestOptions,
    ): Promise<operations.GetVatValidationResponse> {
        return unwrapAsync(vatValidationsGet(
            this,
            { vatNumber: number },
            options,
        ));
    }
}
