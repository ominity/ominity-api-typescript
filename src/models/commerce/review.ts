import * as z from "zod/v4";


// Placeholder - waiting for actual data structure from user
export type Review = {
    id?: string;
    [key: string]: any;
};

/** @internal */
export const Review$inboundSchema: z.ZodType<Review> = z
    .object({
        id: z.string().optional(),
    })
    .passthrough() as unknown as z.ZodType<Review>;

/** @internal */
export const Review$outboundSchema: z.ZodType<Review> = z
    .object({
        id: z.string().optional(),
    })
    .passthrough() as unknown as z.ZodType<Review>;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Review$ {
    /** @deprecated use `Review$inboundSchema` instead. */
    export const inboundSchema = Review$inboundSchema;
    /** @deprecated use `Review$outboundSchema` instead. */
    export const outboundSchema = Review$outboundSchema;
}
