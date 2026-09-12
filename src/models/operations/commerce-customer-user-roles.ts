/*
 * Commerce customer user role operations.
 */

import * as z from "zod/v4";
import { CustomerUserRole, CustomerUserRole$inboundSchema } from "../commerce/customer-user-role.js";
import { HalLinks$inboundSchema } from "../hal.js";
import { buildPaginated, Paginated } from "../pagination.js";

export type CustomerUserRoleData = {
    key: string;
    name: Record<string, string>;
    description?: Record<string, string | null> | undefined;
    permissions: Array<string>;
    isAssignable?: boolean | undefined;
};

export type ListCustomerUserRolesRequest = {
    page?: number | undefined;
    limit?: number | undefined;
};
export type ListCustomerUserRolesResponse = Paginated<CustomerUserRole>;

/** @internal */
export const ListCustomerUserRolesRequest$outboundSchema: z.ZodType<ListCustomerUserRolesRequest> = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});
/** @internal */
export const ListCustomerUserRolesResponse$inboundSchema: z.ZodType<ListCustomerUserRolesResponse> = z.object({
    _embedded: z.object({
        customer_user_roles: z.array(CustomerUserRole$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => buildPaginated(v._embedded.customer_user_roles, v.count, v._links));

export type GetCustomerUserRoleRequest = { id: number };
export type GetCustomerUserRoleResponse = CustomerUserRole;

/** @internal */
export const GetCustomerUserRoleRequest$outboundSchema: z.ZodType<GetCustomerUserRoleRequest> = z.object({
    id: z.number().int(),
});
/** @internal */
export const GetCustomerUserRoleResponse$inboundSchema: z.ZodType<GetCustomerUserRoleResponse> = CustomerUserRole$inboundSchema;

export type CreateCustomerUserRoleRequest = CustomerUserRoleData;
export type CreateCustomerUserRoleResponse = CustomerUserRole;

/** @internal */
export const CreateCustomerUserRoleRequest$outboundSchema: z.ZodType<CreateCustomerUserRoleRequest> = z.object({
    key: z.string(),
    name: z.record(z.string(), z.string()),
    description: z.record(z.string(), z.string().nullable()).optional(),
    permissions: z.array(z.string()),
    isAssignable: z.boolean().optional(),
});
/** @internal */
export const CreateCustomerUserRoleResponse$inboundSchema: z.ZodType<CreateCustomerUserRoleResponse> = CustomerUserRole$inboundSchema;

export type UpdateCustomerUserRoleRequest = {
    id: number;
    data: {
        key?: string | undefined;
        name?: Record<string, string> | undefined;
        description?: Record<string, string | null> | undefined;
        permissions?: Array<string> | undefined;
        isAssignable?: boolean | undefined;
    };
};
export type UpdateCustomerUserRoleResponse = CustomerUserRole;

/** @internal */
export const UpdateCustomerUserRoleRequest$outboundSchema: z.ZodType<UpdateCustomerUserRoleRequest> = z.object({
    id: z.number().int(),
    data: z.object({
        key: z.string().optional(),
        name: z.record(z.string(), z.string()).optional(),
        description: z.record(z.string(), z.string().nullable()).optional(),
        permissions: z.array(z.string()).optional(),
        isAssignable: z.boolean().optional(),
    }),
});
/** @internal */
export const UpdateCustomerUserRoleResponse$inboundSchema: z.ZodType<UpdateCustomerUserRoleResponse> = CustomerUserRole$inboundSchema;

export type DeleteCustomerUserRoleRequest = { id: number };
export type DeleteCustomerUserRoleResponse = void;

/** @internal */
export const DeleteCustomerUserRoleRequest$outboundSchema: z.ZodType<DeleteCustomerUserRoleRequest> = z.object({
    id: z.number().int(),
});
/** @internal */
export const DeleteCustomerUserRoleResponse$inboundSchema: z.ZodType<DeleteCustomerUserRoleResponse> = z.void();
