import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";

export type CurrencyFormat = {
    prefix: string;
    thousandsSeparator: string;
    decimalSeparator: string;
    suffix?: string | null;
};

/** @internal */
export const CurrencyFormat$inboundSchema: z.ZodType<CurrencyFormat> = z.object({
    prefix: z.string(),
    thousandsSeparator: z.string(),
    decimalSeparator: z.string(),
    suffix: z.nullable(z.string()).optional(),
}) as unknown as z.ZodType<CurrencyFormat>;

/** @internal */
export const CurrencyFormat$outboundSchema: z.ZodType<CurrencyFormat> = z.object({
    prefix: z.string(),
    thousandsSeparator: z.string(),
    decimalSeparator: z.string(),
    suffix: z.nullable(z.string()).optional(),
}) as unknown as z.ZodType<CurrencyFormat>;

export type CurrencyLinks = {
    self: {
        href: string;
        type: string;
    };
};

/** @internal */
export const CurrencyLinks$inboundSchema: z.ZodType<CurrencyLinks> = z.object({
    self: z.object({
        href: z.string(),
        type: z.string(),
    }),
}) as unknown as z.ZodType<CurrencyLinks>;

/** @internal */
export const CurrencyLinks$outboundSchema: z.ZodType<CurrencyLinks> = z.object({
    self: z.object({
        href: z.string(),
        type: z.string(),
    }),
}) as unknown as z.ZodType<CurrencyLinks>;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CurrencyLinks$ {
    /** @deprecated use `CurrencyLinks$inboundSchema` instead. */
    export const inboundSchema = CurrencyLinks$inboundSchema;
    /** @deprecated use `CurrencyLinks$outboundSchema` instead. */
    export const outboundSchema = CurrencyLinks$outboundSchema;
}

export type Currency = {
    resource: string;
    code: string;
    name: string;
    conversion: number;
    format: CurrencyFormat;
    isEnabled: boolean;
    isDefault: boolean;
    links: CurrencyLinks;
};

/** @internal */
export const Currency$inboundSchema: z.ZodType<Currency> = z
    .object({
        resource: z.string(),
        code: z.string(),
        name: z.string(),
        conversion: z.number(),
        format: CurrencyFormat$inboundSchema,
        isEnabled: z.boolean(),
        isDefault: z.boolean(),
        _links: CurrencyLinks$inboundSchema,
    })
    .transform((v) => {
        return remap$(v, {
            _links: "links",
        });
    }) as unknown as z.ZodType<Currency>;

/** @internal */
export const Currency$outboundSchema: z.ZodType<Currency> = z
    .object({
        resource: z.string(),
        code: z.string(),
        name: z.string(),
        conversion: z.number(),
        format: CurrencyFormat$outboundSchema,
        isEnabled: z.boolean(),
        isDefault: z.boolean(),
        links: CurrencyLinks$outboundSchema,
    })
    .transform((v) => {
        return remap$(v, {
            links: "_links",
        });
    }) as unknown as z.ZodType<Currency>;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Currency$ {
    /** @deprecated use `Currency$inboundSchema` instead. */
    export const inboundSchema = Currency$inboundSchema;
    /** @deprecated use `Currency$outboundSchema` instead. */
    export const outboundSchema = Currency$outboundSchema;
}
