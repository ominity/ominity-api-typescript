/*
 * Commerce Reviews operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Review, Review$inboundSchema } from "../commerce/review.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListReviewsRequest = {
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

export type ListReviewsResponse = Paginated<Review>;

/** @internal */
export const ListReviewsRequest$outboundSchema: z.ZodType<
    ListReviewsRequest
> = z.object({
    include: z.string().optional(),
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListReviewsResponse$inboundSchema: z.ZodType<
    ListReviewsResponse
> = z.object({
    _embedded: z.object({
        reviews: z.array(Review$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.reviews,
        v.count,
        v._links,
    )
) as unknown as z.ZodType<ListReviewsResponse>;

export type GetReviewRequest = {
    /**
     * Review ID.
     */
    id: string;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetReviewResponse = Review;

/** @internal */
export const GetReviewRequest$outboundSchema: z.ZodType<
    GetReviewRequest
> = z.object({
    id: z.string(),
    include: z.string().optional(),
});

/** @internal */
export const GetReviewResponse$inboundSchema: z.ZodType<
    GetReviewResponse
> = Review$inboundSchema;

export type CreateReviewRequest = Record<string, any>;
export type CreateReviewResponse = Review;

/** @internal */
export const CreateReviewRequest$outboundSchema: z.ZodType<CreateReviewRequest> = z.record(z.string(), z.any());
/** @internal */
export const CreateReviewResponse$inboundSchema: z.ZodType<CreateReviewResponse> = Review$inboundSchema;

export type UpdateReviewRequest = {
    id: string;
    data: Record<string, any>;
};
export type UpdateReviewResponse = Review;

/** @internal */
export const UpdateReviewRequest$outboundSchema: z.ZodType<UpdateReviewRequest> = z.object({
    id: z.string(),
    data: z.record(z.string(), z.any()),
});
/** @internal */
export const UpdateReviewResponse$inboundSchema: z.ZodType<UpdateReviewResponse> = Review$inboundSchema;
