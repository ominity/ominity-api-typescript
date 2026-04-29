import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { SocialProviderLink, SocialProviderLink$inboundSchema } from "../settings/social-provider-link.js";
import { SocialProvider, SocialProvider$inboundSchema } from "../settings/social-provider.js";
import { SocialProviderUser, SocialProviderUser$inboundSchema } from "../settings/social-provider-user.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListSocialProvidersRequest = {
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListSocialProvidersResponse = Paginated<SocialProvider>;

/** @internal */
export const ListSocialProvidersRequest$outboundSchema: z.ZodType<
    ListSocialProvidersRequest
> = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListSocialProvidersResponse$inboundSchema: z.ZodType<
    ListSocialProvidersResponse
> = z.object({
    _embedded: z.object({
        socialproviders: z.array(SocialProvider$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.socialproviders,
        v.count,
        v._links,
    )
);

export type GetSocialProviderRequest = {
    /**
     * Social Provider ID.
     */
    id: number;
};

export type GetSocialProviderResponse = SocialProvider;

/** @internal */
export const GetSocialProviderRequest$outboundSchema: z.ZodType<
    GetSocialProviderRequest
> = z.object({
    id: z.number(),
});

/** @internal */
export const GetSocialProviderResponse$inboundSchema: z.ZodType<
    GetSocialProviderResponse
> = SocialProvider$inboundSchema;

export type CreateSocialProviderLinkRequest = {
    /**
     * Social Provider ID.
     */
    id: number;
    /**
     * Redirect URL.
     */
    redirectUrl: string;
};

export type CreateSocialProviderLinkResponse = SocialProviderLink;

/** @internal */
export const CreateSocialProviderLinkRequest$outboundSchema: z.ZodType<
    CreateSocialProviderLinkRequest
> = z.object({
    id: z.number(),
    redirectUrl: z.string(),
});

/** @internal */
export const CreateSocialProviderLinkResponse$inboundSchema: z.ZodType<
    CreateSocialProviderLinkResponse
> = SocialProviderLink$inboundSchema;

export type ExchangeSocialProviderAccessCodeRequest = {
    /**
     * Social Provider ID.
     */
    providerId: number;
    /**
     * Provider access code.
     */
    code: string;
};

export type ExchangeSocialProviderAccessCodeResponse = SocialProviderUser;

/** @internal */
export const ExchangeSocialProviderAccessCodeRequest$outboundSchema: z.ZodType<
    ExchangeSocialProviderAccessCodeRequest
> = z.object({
    providerId: z.number(),
    code: z.string(),
});

/** @internal */
export const ExchangeSocialProviderAccessCodeResponse$inboundSchema: z.ZodType<
    ExchangeSocialProviderAccessCodeResponse
> = SocialProviderUser$inboundSchema;

export type ListSocialProviderUsersRequest = {
    /**
     * Social Provider ID.
     */
    providerId: number;
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
    /**
     * Sort by fields. Prefix with "-" for descending.
     */
    sort?: string | undefined;
    /**
     * Filter query.
     */
    filter?: {
        id?: number | undefined;
        user?: number | undefined;
        identifier?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
    } | undefined;
};

export type ListSocialProviderUsersResponse = Paginated<SocialProviderUser>;

/** @internal */
export const ListSocialProviderUsersRequest$outboundSchema: z.ZodType<
    ListSocialProviderUsersRequest
> = z.object({
    providerId: z.number(),
    page: z.number().optional(),
    limit: z.number().optional(),
    sort: z.string().optional(),
    filter: z.object({
        id: z.number().optional(),
        user: z.number().optional(),
        identifier: z.string().optional(),
        name: z.string().optional(),
        email: z.string().optional(),
    }).optional(),
});

/** @internal */
export const ListSocialProviderUsersResponse$inboundSchema: z.ZodType<
    ListSocialProviderUsersResponse
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

export type GetSocialProviderUserRequest = {
    /**
     * Social Provider ID.
     */
    providerId: number;
    /**
     * Social Provider User ID.
     */
    id: number;
};

export type GetSocialProviderUserResponse = SocialProviderUser;

/** @internal */
export const GetSocialProviderUserRequest$outboundSchema: z.ZodType<
    GetSocialProviderUserRequest
> = z.object({
    providerId: z.number(),
    id: z.number(),
});

/** @internal */
export const GetSocialProviderUserResponse$inboundSchema: z.ZodType<
    GetSocialProviderUserResponse
> = SocialProviderUser$inboundSchema;

export type UpdateSocialProviderUserRequest = {
    /**
     * Social Provider ID.
     */
    providerId: number;
    /**
     * Social Provider User ID.
     */
    id: number;
    /**
     * User ID to link.
     */
    userId?: number | null | undefined;
};

export type UpdateSocialProviderUserResponse = SocialProviderUser;

/** @internal */
export const UpdateSocialProviderUserRequest$outboundSchema: z.ZodType<
    UpdateSocialProviderUserRequest
> = z.object({
    providerId: z.number(),
    id: z.number(),
    userId: z.number().nullable().optional(),
});

/** @internal */
export const UpdateSocialProviderUserResponse$inboundSchema: z.ZodType<
    UpdateSocialProviderUserResponse
> = SocialProviderUser$inboundSchema;

export type DeleteSocialProviderUserRequest = {
    /**
     * Social Provider ID.
     */
    providerId: number;
    /**
     * Social Provider User ID.
     */
    id: number;
};

export type DeleteSocialProviderUserResponse = void;

/** @internal */
export const DeleteSocialProviderUserRequest$outboundSchema: z.ZodType<
    DeleteSocialProviderUserRequest
> = z.object({
    providerId: z.number(),
    id: z.number(),
});

/** @internal */
export const DeleteSocialProviderUserResponse$inboundSchema: z.ZodType<
    DeleteSocialProviderUserResponse
> = z.void();
