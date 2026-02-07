/*
 * Commerce Subscription Intervals operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { SubscriptionInterval, SubscriptionInterval$inboundSchema } from "../commerce/subscription-interval.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListSubscriptionIntervalsRequest = {
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

export type ListSubscriptionIntervalsResponse = Paginated<SubscriptionInterval>;

/** @internal */
export const ListSubscriptionIntervalsRequest$outboundSchema: z.ZodType<
    ListSubscriptionIntervalsRequest
> = z.object({
    include: z.string().optional(),
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListSubscriptionIntervalsResponse$inboundSchema: z.ZodType<
    ListSubscriptionIntervalsResponse
> = z.object({
    _embedded: z.object({
        subscription_intervals: z.array(SubscriptionInterval$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.subscription_intervals,
        v.count,
        v._links,
    )
);

export type GetSubscriptionIntervalRequest = {
    /**
     * Subscription Interval ID.
     */
    id: number;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetSubscriptionIntervalResponse = SubscriptionInterval;

/** @internal */
export const GetSubscriptionIntervalRequest$outboundSchema: z.ZodType<
    GetSubscriptionIntervalRequest
> = z.object({
    id: z.number(),
    include: z.string().optional(),
});

/** @internal */
export const GetSubscriptionIntervalResponse$inboundSchema: z.ZodType<
    GetSubscriptionIntervalResponse
> = SubscriptionInterval$inboundSchema;
