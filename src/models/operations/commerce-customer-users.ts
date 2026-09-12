/*
 * Commerce customer user membership operations.
 */

import * as z from "zod/v4";
import { CustomerUser, CustomerUser$inboundSchema } from "../commerce/customer-user.js";
import { HalLinks$inboundSchema } from "../hal.js";
import { buildPaginated, Paginated } from "../pagination.js";

export type ListCustomerUsersRequest = {
    customerId: number;
    filter?: {
        id?: number | undefined;
    } | undefined;
    sort?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
};

export type ListCustomerUsersResponse = Paginated<CustomerUser>;

/** @internal */
export const ListCustomerUsersRequest$outboundSchema: z.ZodType<ListCustomerUsersRequest> = z.object({
    customerId: z.number().int(),
    filter: z.object({
        id: z.number().int().optional(),
    }).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListCustomerUsersResponse$inboundSchema: z.ZodType<ListCustomerUsersResponse> = z.object({
    _embedded: z.object({
        customer_users: z.array(CustomerUser$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => buildPaginated(v._embedded.customer_users, v.count, v._links));

export type GetCustomerUserRequest = {
    customerId: number;
    userId: number;
};
export type GetCustomerUserResponse = CustomerUser;

/** @internal */
export const GetCustomerUserRequest$outboundSchema: z.ZodType<GetCustomerUserRequest> = z.object({
    customerId: z.number().int(),
    userId: z.number().int(),
});
/** @internal */
export const GetCustomerUserResponse$inboundSchema: z.ZodType<GetCustomerUserResponse> = CustomerUser$inboundSchema;

export type UpdateCustomerUserRequest = {
    customerId: number;
    userId: number;
    data: {
        roleId: number;
    };
};
export type UpdateCustomerUserResponse = CustomerUser;

/** @internal */
export const UpdateCustomerUserRequest$outboundSchema: z.ZodType<UpdateCustomerUserRequest> = z.object({
    customerId: z.number().int(),
    userId: z.number().int(),
    data: z.object({
        roleId: z.number().int(),
    }),
});
/** @internal */
export const UpdateCustomerUserResponse$inboundSchema: z.ZodType<UpdateCustomerUserResponse> = CustomerUser$inboundSchema;

export type DeleteCustomerUserRequest = {
    customerId: number;
    userId: number;
};
export type DeleteCustomerUserResponse = void;

/** @internal */
export const DeleteCustomerUserRequest$outboundSchema: z.ZodType<DeleteCustomerUserRequest> = z.object({
    customerId: z.number().int(),
    userId: z.number().int(),
});
/** @internal */
export const DeleteCustomerUserResponse$inboundSchema: z.ZodType<DeleteCustomerUserResponse> = z.void();
