import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";

export type ShippingZoneLinks = {
    self: {
        href: string;
        type: string;
    };
};

/** @internal */
export const ShippingZoneLinks$inboundSchema: z.ZodType<ShippingZoneLinks> = z.object({
    self: z.object({
        href: z.string(),
        type: z.string(),
    }),
});

/** @internal */
export const ShippingZoneLinks$outboundSchema: z.ZodType<ShippingZoneLinks> = z.object({
    self: z.object({
        href: z.string(),
        type: z.string(),
    }),
});


/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ShippingZoneLinks$ {
    /** @deprecated use `ShippingZoneLinks$inboundSchema` instead. */
    export const inboundSchema = ShippingZoneLinks$inboundSchema;
    /** @deprecated use `ShippingZoneLinks$outboundSchema` instead. */
    export const outboundSchema = ShippingZoneLinks$outboundSchema;
}

export type ShippingZone = {
    resource: string;
    id: string;
    name: string;
    regions?: Array<string> | null;
    order?: number | null;
    isActive: boolean;
    isDefault: boolean;
    updatedAt: string;
    createdAt: string;
    links: ShippingZoneLinks;
};

/** @internal */
export const ShippingZone$inboundSchema: z.ZodType<ShippingZone> = z
    .object({
        resource: z.string(),
        id: z.string(),
        name: z.string(),
        regions: z.array(z.string()).optional().nullable(),
        order: z.number().int().optional().nullable(),
        isActive: z.boolean(),
        isDefault: z.boolean(),
        updatedAt: z.string(),
        createdAt: z.string(),
        _links: ShippingZoneLinks$inboundSchema,
    })
    .transform((v) => {
        return remap$(v, {
            _links: "links",
        });
    }) as unknown as z.ZodType<ShippingZone>;

/** @internal */
export const ShippingZone$outboundSchema: z.ZodType<ShippingZone> = z
    .object({
        resource: z.string(),
        id: z.string(),
        name: z.string(),
        regions: z.array(z.string()).optional().nullable(),
        order: z.number().int().optional().nullable(),
        isActive: z.boolean(),
        isDefault: z.boolean(),
        updatedAt: z.string(),
        createdAt: z.string(),
        links: ShippingZoneLinks$outboundSchema,
    })
    .transform((v) => {
        return remap$(v, {
            links: "_links",
        });
    }) as unknown as z.ZodType<ShippingZone>;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ShippingZone$ {
    /** @deprecated use `ShippingZone$inboundSchema` instead. */
    export const inboundSchema = ShippingZone$inboundSchema;
    /** @deprecated use `ShippingZone$outboundSchema` instead. */
    export const outboundSchema = ShippingZone$outboundSchema;
}
