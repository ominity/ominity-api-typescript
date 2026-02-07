/*
 * Commerce VAT Validations operations.
 */

import * as z from "zod/v4";
import { VatValidation, VatValidation$inboundSchema } from "../commerce/vat-validation.js";

export type GetVatValidationRequest = {
    /**
     * VAT Number.
     */
    vatNumber: string;
};

export type GetVatValidationResponse = VatValidation;

/** @internal */
export const GetVatValidationRequest$outboundSchema: z.ZodType<
    GetVatValidationRequest
> = z.object({
    vatNumber: z.string(),
});

/** @internal */
export const GetVatValidationResponse$inboundSchema: z.ZodType<
    GetVatValidationResponse
> = VatValidation$inboundSchema;
