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
     * Include related customer or role resources.
     */
    include?: string | undefined;
    /**
     * Filter by membership, role, or customer fields.
     */
    filter?: {
        id?: number | undefined;
        role?: number | undefined;
        customer?: number | undefined;
    } | undefined;
    /**
     * Sort by membership fields.
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

export type ListUserCustomersResponse = Paginated<CustomerUser>;

/** @internal */
export const ListUserCustomersRequest$outboundSchema: z.ZodType<
    ListUserCustomersRequest
> = z.object({
    id: z.number(),
    include: z.string().optional(),
    filter: z.object({
        id: z.number().int().optional(),
        role: z.number().int().optional(),
        customer: z.number().int().optional(),
    }).optional(),
    sort: z.string().optional(),
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

export type GetUserCustomerRequest = {
    userId: number;
    customerId: number;
    include?: string | undefined;
};

export type GetUserCustomerResponse = CustomerUser;

/** @internal */
export const GetUserCustomerRequest$outboundSchema: z.ZodType<GetUserCustomerRequest> = z.object({
    userId: z.number().int(),
    customerId: z.number().int(),
    include: z.string().optional(),
});

/** @internal */
export const GetUserCustomerResponse$inboundSchema: z.ZodType<GetUserCustomerResponse> = CustomerUser$inboundSchema;
