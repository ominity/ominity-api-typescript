import * as z from "zod/v4";


// Placeholder - waiting for actual data structure from user
export type ShippingMethod = {
    id?: string;
    name?: string;
    [key: string]: any;
};

/** @internal */
export const ShippingMethod$inboundSchema: z.ZodType<ShippingMethod> = z
    .object({
        id: z.string().optional(),
        name: z.string().optional(),
    })
    .passthrough() as unknown as z.ZodType<ShippingMethod>;

/** @internal */
export const ShippingMethod$outboundSchema: z.ZodType<ShippingMethod> = z
    .object({
        id: z.string().optional(),
        name: z.string().optional(),
    })
    .passthrough() as unknown as z.ZodType<ShippingMethod>;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ShippingMethod$ {
    /** @deprecated use `ShippingMethod$inboundSchema` instead. */
    export const inboundSchema = ShippingMethod$inboundSchema;
    /** @deprecated use `ShippingMethod$outboundSchema` instead. */
    export const outboundSchema = ShippingMethod$outboundSchema;
}
