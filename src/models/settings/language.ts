import * as z from "zod/v4";

export type Language = {
    resource: string;
    code: string;
    name: string;
    native: string;
    isDefault: boolean;
    isEnabled: boolean;
};

/** @internal */
export const Language$inboundSchema: z.ZodType<Language> = z.object({
    resource: z.string(),
    code: z.string(),
    name: z.string(),
    native: z.string(),
    isDefault: z.boolean(),
    isEnabled: z.boolean(),
});

/** @internal */
export const Language$outboundSchema: z.ZodType<Language> = z.object({
    resource: z.string(),
    code: z.string(),
    name: z.string(),
    native: z.string(),
    isDefault: z.boolean(),
    isEnabled: z.boolean(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Language$ {
    /** @deprecated use `Language$inboundSchema` instead. */
    export const inboundSchema = Language$inboundSchema;
    /** @deprecated use `Language$outboundSchema` instead. */
    export const outboundSchema = Language$outboundSchema;
}
