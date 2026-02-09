/*
 * User OAuth Accounts operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { SocialProviderUser, SocialProviderUser$inboundSchema } from "../settings/social-provider-user.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListUserOAuthAccountsRequest = {
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

export type ListUserOAuthAccountsResponse = Paginated<SocialProviderUser>;

/** @internal */
export const ListUserOAuthAccountsRequest$outboundSchema: z.ZodType<
    ListUserOAuthAccountsRequest
> = z.object({
    id: z.number(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListUserOAuthAccountsResponse$inboundSchema: z.ZodType<
    ListUserOAuthAccountsResponse
> = z.object({
    _embedded: z.object({
        socialprovider_users: z.array(SocialProviderUser$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.socialprovider_users,
        v.count,
        v._links,
    )
);
