/*
 * Customer User model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Customer, Customer$inboundSchema } from "./customer.js";
import { CustomerUserRole, CustomerUserRole$inboundSchema } from "./customer-user-role.js";

export type CustomerUser = {
    resource: "customer_user";
    userId: number;
    customerId: number;
    roleId: number;
    isOwner: boolean;
    permissions: Array<string>;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string | null;
    customer?: Customer;
    role?: CustomerUserRole;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const CustomerUser$inboundSchema: z.ZodType<CustomerUser> = z.object({
    resource: z.literal("customer_user"),
    userId: z.number().int(),
    customerId: z.number().int(),
    roleId: z.number().int(),
    isOwner: z.boolean(),
    permissions: z.array(z.string()),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    avatar: z.string().nullable().optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
    _embedded: z.object({
        customer: Customer$inboundSchema.optional(),
        role: CustomerUserRole$inboundSchema.optional(),
    }).loose().optional(),
}).loose().transform((v) => {
    const embedded = v._embedded;
    const customerUser = remap$(v, {
        "_links": "links",
        "_embedded": null,
    }) as CustomerUser;

    if (embedded?.role) {
        customerUser.role = embedded.role;
    }

    if (embedded?.customer) {
        customerUser.customer = embedded.customer;
    }

    return customerUser;
}) as unknown as z.ZodType<CustomerUser>;
