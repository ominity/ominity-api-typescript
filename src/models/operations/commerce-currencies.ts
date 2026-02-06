/*
 * Commerce Currencies operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Currency, Currency$inboundSchema } from "../commerce/currency.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListCurrenciesRequest = {
    /**
     * Include related resources.
     */
    include?: string | undefined;
    /**
     * Filter by fields.
     */
    filter?: Record<string, any> | undefined;
    /**
     * Sort by fields.
     */
    sort?: string | undefined;
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListCurrenciesResponse = Paginated<Currency>;

/** @internal */
export const ListCurrenciesRequest$outboundSchema: z.ZodType<
    ListCurrenciesRequest
> = z.object({
    include: z.string().optional(),
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListCurrenciesResponse$inboundSchema: z.ZodType<
    ListCurrenciesResponse
> = z.object({
    _embedded: z.object({
        currencies: z.array(Currency$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.currencies,
        v.count,
        v._links,
    )
);

export type GetCurrencyRequest = {
    /**
     * Currency Code.
     */
    code: string;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetCurrencyResponse = Currency;

/** @internal */
export const GetCurrencyRequest$outboundSchema: z.ZodType<
    GetCurrencyRequest
> = z.object({
    code: z.string(),
    include: z.string().optional(),
});

/** @internal */
export const GetCurrencyResponse$inboundSchema: z.ZodType<
    GetCurrencyResponse
> = Currency$inboundSchema;
