/*
 * CMS Content operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { ContentEntry, ContentEntry$inboundSchema } from "../cms/content-entry.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListContentRequest = {
    slug: string;
    filter?: Record<string, any> | undefined;
    sort?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
};

export type ListContentResponse<TEntry extends ContentEntry = ContentEntry> = Paginated<TEntry>;

/** @internal */
export const ListContentRequest$outboundSchema: z.ZodType<
    ListContentRequest
> = z.object({
    slug: z.string(),
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListContentResponse$inboundSchema: z.ZodType<
    ListContentResponse
> = z.object({
    _embedded: z.record(z.string(), z.array(ContentEntry$inboundSchema)),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    const entries = Object.values(v._embedded)[0] ?? [];

    return buildPaginated(
        entries,
        v.count,
        v._links,
    );
});

export type GetContentRequest = {
    slug: string;
    id: string;
};

export type GetContentResponse<TEntry extends ContentEntry = ContentEntry> = TEntry;

/** @internal */
export const GetContentRequest$outboundSchema: z.ZodType<
    GetContentRequest
> = z.object({
    slug: z.string(),
    id: z.string(),
});

/** @internal */
export const GetContentResponse$inboundSchema: z.ZodType<
    GetContentResponse
> = ContentEntry$inboundSchema;

export type CreateContentRequest = {
    slug: string;
    data: Record<string, any>;
};

export type CreateContentResponse<TEntry extends ContentEntry = ContentEntry> = TEntry;

/** @internal */
export const CreateContentRequest$outboundSchema: z.ZodType<
    CreateContentRequest
> = z.object({
    slug: z.string(),
    data: z.record(z.string(), z.any()),
});

/** @internal */
export const CreateContentResponse$inboundSchema: z.ZodType<
    CreateContentResponse
> = ContentEntry$inboundSchema;

export type UpdateContentRequest = {
    slug: string;
    id: string;
    data: Record<string, any>;
};

export type UpdateContentResponse<TEntry extends ContentEntry = ContentEntry> = TEntry;

/** @internal */
export const UpdateContentRequest$outboundSchema: z.ZodType<
    UpdateContentRequest
> = z.object({
    slug: z.string(),
    id: z.string(),
    data: z.record(z.string(), z.any()),
});

/** @internal */
export const UpdateContentResponse$inboundSchema: z.ZodType<
    UpdateContentResponse
> = ContentEntry$inboundSchema;

export type DeleteContentRequest = {
    slug: string;
    id: string;
};

export type DeleteContentResponse = {
    deleted: boolean;
};

/** @internal */
export const DeleteContentRequest$outboundSchema: z.ZodType<
    DeleteContentRequest
> = z.object({
    slug: z.string(),
    id: z.string(),
});

/** @internal */
export const DeleteContentResponse$inboundSchema: z.ZodType<
    DeleteContentResponse
> = z.object({
    deleted: z.boolean(),
});
