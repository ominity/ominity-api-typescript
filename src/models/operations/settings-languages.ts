import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Language, Language$inboundSchema } from "../settings/language.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListLanguagesRequest = {
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

export type ListLanguagesResponse = Paginated<Language>;

/** @internal */
export const ListLanguagesRequest$outboundSchema: z.ZodType<
    ListLanguagesRequest
> = z.object({
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListLanguagesResponse$inboundSchema: z.ZodType<
    ListLanguagesResponse
> = z.object({
    _embedded: z.object({
        languages: z.array(Language$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.languages,
        v.count,
        v._links,
    )
);
