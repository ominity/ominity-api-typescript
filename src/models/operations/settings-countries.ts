import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Country, Country$inboundSchema } from "../settings/country.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListCountriesRequest = {
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

export type ListCountriesResponse = Paginated<Country>;

/** @internal */
export const ListCountriesRequest$outboundSchema: z.ZodType<
    ListCountriesRequest
> = z.object({
    include: z.string().optional(),
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListCountriesResponse$inboundSchema: z.ZodType<
    ListCountriesResponse
> = z.object({
    _embedded: z.object({
        countries: z.array(Country$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.countries,
        v.count,
        v._links,
    )
);

export type GetCountryRequest = {
    /**
     * Country Code.
     */
    code: string;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetCountryResponse = Country;

/** @internal */
export const GetCountryRequest$outboundSchema: z.ZodType<
    GetCountryRequest
> = z.object({
    code: z.string(),
    include: z.string().optional(),
});

/** @internal */
export const GetCountryResponse$inboundSchema: z.ZodType<
    GetCountryResponse
> = Country$inboundSchema;
