/*
 * Admin operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Admin, Admin$inboundSchema } from "../identity/admin.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListAdminsRequest = {
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListAdminsResponse = Paginated<Admin>;

/** @internal */
export const ListAdminsRequest$outboundSchema: z.ZodType<
    ListAdminsRequest
> = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListAdminsResponse$inboundSchema: z.ZodType<
    ListAdminsResponse
> = z.object({
    _embedded: z.object({
        admins: z.array(Admin$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.admins,
        v.count,
        v._links,
    )
);

export type GetAdminRequest = {
    /**
     * Admin ID.
     */
    id: number;
};

export type GetAdminResponse = Admin;

/** @internal */
export const GetAdminRequest$outboundSchema: z.ZodType<
    GetAdminRequest
> = z.object({
    id: z.number(),
});

/** @internal */
export const GetAdminResponse$inboundSchema: z.ZodType<
    GetAdminResponse
> = Admin$inboundSchema;
