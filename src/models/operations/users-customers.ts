/*
 * User Customers operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { CustomerUser, CustomerUser$inboundSchema } from "../commerce/customer-user.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListUserCustomersRequest = {
    /**
     * User ID.
     */
    id: number;
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListUserCustomersResponse = Paginated<CustomerUser>;

/** @internal */
export const ListUserCustomersRequest$outboundSchema: z.ZodType<
    ListUserCustomersRequest
> = z.object({
    id: z.number(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListUserCustomersResponse$inboundSchema: z.ZodType<
    ListUserCustomersResponse
> = z.object({
    _embedded: z.object({
        customer_users: z.array(CustomerUser$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.customer_users,
        v.count,
        v._links,
    )
);
