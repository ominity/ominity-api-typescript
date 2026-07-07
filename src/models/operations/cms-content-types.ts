/*
 * CMS Content Types operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { ContentType, ContentType$inboundSchema } from "../cms/content-type.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListContentTypesRequest = {
    filterId?: number | undefined;
    filterNameSingular?: string | undefined;
    filterNamePlural?: string | undefined;
    filterSlug?: string | undefined;
    filterResourceKey?: string | undefined;
    include?: string | undefined;
    sort?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
};

export type ListContentTypesResponse = Paginated<ContentType>;

/** @internal */
export const ListContentTypesRequest$outboundSchema: z.ZodType<
    ListContentTypesRequest
> = z.object({
    filterId: z.number().optional(),
    filterNameSingular: z.string().optional(),
    filterNamePlural: z.string().optional(),
    filterSlug: z.string().optional(),
    filterResourceKey: z.string().optional(),
    include: z.string().optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListContentTypesResponse$inboundSchema: z.ZodType<
    ListContentTypesResponse
> = z.object({
    _embedded: z.object({
        content_types: z.array(ContentType$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.content_types,
        v.count,
        v._links,
    )
);

export type GetContentTypeRequest = {
    id: number;
    include?: string | undefined;
};

export type GetContentTypeResponse = ContentType;

/** @internal */
export const GetContentTypeRequest$outboundSchema: z.ZodType<
    GetContentTypeRequest
> = z.object({
    id: z.number(),
    include: z.string().optional(),
});

/** @internal */
export const GetContentTypeResponse$inboundSchema: z.ZodType<
    GetContentTypeResponse
> = ContentType$inboundSchema;
