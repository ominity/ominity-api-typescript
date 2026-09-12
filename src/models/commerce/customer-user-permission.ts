/*
 * Customer user permission catalogue models.
 */

import * as z from "zod/v4";

export type CustomerUserPermissionGroup = {
    key: string;
    label: string;
    description: string | null;
    icon: string | null;
    order: number;
};

export type CustomerUserPermission = {
    key: string;
    label: string;
    description: string | null;
    group: string | null;
    icon: string | null;
};

export type CustomerUserPermissionCatalog = {
    resource: "customer_user_permission_catalog";
    groups: Array<CustomerUserPermissionGroup>;
    permissions: Array<CustomerUserPermission>;
};

/** @internal */
export const CustomerUserPermissionGroup$inboundSchema: z.ZodType<CustomerUserPermissionGroup> = z.object({
    key: z.string(),
    label: z.string(),
    description: z.string().nullable(),
    icon: z.string().nullable(),
    order: z.number().int(),
});

/** @internal */
export const CustomerUserPermission$inboundSchema: z.ZodType<CustomerUserPermission> = z.object({
    key: z.string(),
    label: z.string(),
    description: z.string().nullable(),
    group: z.string().nullable(),
    icon: z.string().nullable(),
});

/** @internal */
export const CustomerUserPermissionCatalog$inboundSchema: z.ZodType<CustomerUserPermissionCatalog> = z.object({
    resource: z.literal("customer_user_permission_catalog"),
    groups: z.array(CustomerUserPermissionGroup$inboundSchema),
    permissions: z.array(CustomerUserPermission$inboundSchema),
});
