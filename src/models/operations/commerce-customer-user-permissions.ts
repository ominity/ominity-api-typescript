/*
 * Commerce customer user permission operations.
 */

import * as z from "zod/v4";
import {
    CustomerUserPermissionCatalog,
    CustomerUserPermissionCatalog$inboundSchema,
} from "../commerce/customer-user-permission.js";

export type ListCustomerUserPermissionsRequest = Record<string, never>;
export type ListCustomerUserPermissionsResponse = CustomerUserPermissionCatalog;

/** @internal */
export const ListCustomerUserPermissionsRequest$outboundSchema: z.ZodType<ListCustomerUserPermissionsRequest> = z.object({});
/** @internal */
export const ListCustomerUserPermissionsResponse$inboundSchema: z.ZodType<ListCustomerUserPermissionsResponse> = CustomerUserPermissionCatalog$inboundSchema;
