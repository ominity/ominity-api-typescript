import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { SocialProvider, SocialProvider$inboundSchema } from "../settings/social-provider.js";
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
