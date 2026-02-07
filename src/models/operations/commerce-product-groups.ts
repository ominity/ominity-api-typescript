/*
 * Commerce Product Groups operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { ProductGroup, ProductGroup$inboundSchema } from "../commerce/product-group.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListProductGroupsRequest = {
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

export type ListProductGroupsResponse = Paginated<ProductGroup>;

/** @internal */
export const ListProductGroupsRequest$outboundSchema: z.ZodType<
    ListProductGroupsRequest
> = z.object({
    include: z.string().optional(),
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListProductGroupsResponse$inboundSchema: z.ZodType<
    ListProductGroupsResponse
> = z.object({
    _embedded: z.object({
        product_groups: z.array(ProductGroup$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.product_groups,
        v.count,
        v._links,
    )
);

export type GetProductGroupRequest = {
    /**
     * Product Group ID.
     */
    id: number;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetProductGroupResponse = ProductGroup;

/** @internal */
export const GetProductGroupRequest$outboundSchema: z.ZodType<
    GetProductGroupRequest
> = z.object({
    id: z.number(),
    include: z.string().optional(),
});

/** @internal */
export const GetProductGroupResponse$inboundSchema: z.ZodType<
    GetProductGroupResponse
> = ProductGroup$inboundSchema;
