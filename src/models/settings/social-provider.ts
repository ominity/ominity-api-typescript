import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";

export type SocialProviderLinks = {
    self: {
        href: string;
        type: string;
    };
};

/** @internal */
export const SocialProviderLinks$inboundSchema: z.ZodType<SocialProviderLinks> = z.object({
    self: z.object({
        href: z.string(),
        type: z.string(),
    }),
});

/** @internal */
export const SocialProviderLinks$outboundSchema: z.ZodType<SocialProviderLinks> = z.object({
    self: z.object({
        href: z.string(),
        type: z.string(),
    }),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace SocialProviderLinks$ {
    /** @deprecated use `SocialProviderLinks$inboundSchema` instead. */
    export const inboundSchema = SocialProviderLinks$inboundSchema;
    /** @deprecated use `SocialProviderLinks$outboundSchema` instead. */
    export const outboundSchema = SocialProviderLinks$outboundSchema;
}

export type SocialProvider = {
    resource: string;
    id: number;
    provider: string;
    name: string;
    icon: string;
    isEnabled: boolean;
    updatedAt: string;
    createdAt: string;
    links: SocialProviderLinks;
};

/** @internal */
export const SocialProvider$inboundSchema: z.ZodType<SocialProvider> = z.object({
    resource: z.string(),
    id: z.number(),
    provider: z.string(),
    name: z.string(),
    icon: z.string(),
    isEnabled: z.boolean(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: SocialProviderLinks$inboundSchema,
}).transform((v) => {
    return remap$(v, {
        _links: "links",
    });
}) as unknown as z.ZodType<SocialProvider>;

/** @internal */
export const SocialProvider$outboundSchema: z.ZodType<SocialProvider> = z.object({
    resource: z.string(),
    id: z.number(),
    provider: z.string(),
    name: z.string(),
    icon: z.string(),
    isEnabled: z.boolean(),
    updatedAt: z.string(),
    createdAt: z.string(),
    links: SocialProviderLinks$outboundSchema,
}).transform((v) => {
    return remap$(v, {
        links: "_links",
    });
}) as unknown as z.ZodType<SocialProvider>;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace SocialProvider$ {
    /** @deprecated use `SocialProvider$inboundSchema` instead. */
    export const inboundSchema = SocialProvider$inboundSchema;
    /** @deprecated use `SocialProvider$outboundSchema` instead. */
    export const outboundSchema = SocialProvider$outboundSchema;
}
