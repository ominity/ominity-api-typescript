/*
 * Commerce VAT Validation model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type VatValidation = {
    resource: string;
    vatNumber: string;
    isValid: boolean;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const VatValidation$inboundSchema: z.ZodType<VatValidation> = z.object({
    resource: z.string(),
    vatNumber: z.string(),
    isValid: z.boolean(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as VatValidation;
});
