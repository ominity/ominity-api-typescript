import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { Currency, Currency$inboundSchema, Currency$outboundSchema } from "../commerce/currency.js";

export type CountryLinks = {
    self: {
        href: string;
        type: string;
    };
};

/** @internal */
export const CountryLinks$inboundSchema: z.ZodType<CountryLinks> = z.object({
    self: z.object({
        href: z.string(),
        type: z.string(),
    }),
});

/** @internal */
export const CountryLinks$outboundSchema: z.ZodType<CountryLinks> = z.object({
    self: z.object({
        href: z.string(),
        type: z.string(),
    }),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CountryLinks$ {
    /** @deprecated use `CountryLinks$inboundSchema` instead. */
    export const inboundSchema = CountryLinks$inboundSchema;
    /** @deprecated use `CountryLinks$outboundSchema` instead. */
    export const outboundSchema = CountryLinks$outboundSchema;
}

export type Country = {
    resource: string;
    code: string;
    name: string;
    currency: string;
    language: string;
    isEnabled: boolean;
    updatedAt: string;
    createdAt: string;
    links: CountryLinks;
    embedded?: {
        currency?: Currency;
    };
};

/** @internal */
export const Country$inboundSchema: z.ZodType<Country> = z.object({
    resource: z.string(),
    code: z.string(),
    name: z.string(),
    currency: z.string(),
    language: z.string(),
    isEnabled: z.boolean(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: CountryLinks$inboundSchema,
    _embedded: z.object({
        currency: Currency$inboundSchema.optional(),
    }).optional(),
}).transform((v) => {
    return remap$(v, {
        _links: "links",
        _embedded: "embedded",
    });
}) as unknown as z.ZodType<Country>;

/** @internal */
export const Country$outboundSchema: z.ZodType<Country> = z.object({
    resource: z.string(),
    code: z.string(),
    name: z.string(),
    currency: z.string(),
    language: z.string(),
    isEnabled: z.boolean(),
    updatedAt: z.string(),
    createdAt: z.string(),
    links: CountryLinks$outboundSchema,
    embedded: z.object({
        currency: Currency$outboundSchema.optional(),
    }).optional(),
}).transform((v) => {
    return remap$(v, {
        links: "_links",
        embedded: "_embedded",
    });
}) as unknown as z.ZodType<Country>;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Country$ {
    /** @deprecated use `Country$inboundSchema` instead. */
    export const inboundSchema = Country$inboundSchema;
    /** @deprecated use `Country$outboundSchema` instead. */
    export const outboundSchema = Country$outboundSchema;
}
