import * as z from "zod/v4";


// Placeholder - waiting for actual data structure from user
export type CartItem = {
  id?: string;
  [key: string]: any;
};

/** @internal */
export const CartItem$inboundSchema: z.ZodType<CartItem> = z
  .object({
    id: z.string().optional(),
  })
  .passthrough() as unknown as z.ZodType<CartItem>;

/** @internal */
export const CartItem$outboundSchema: z.ZodType<CartItem> = z
  .object({
    id: z.string().optional(),
  })
  .passthrough() as unknown as z.ZodType<CartItem>;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CartItem$ {
  /** @deprecated use `CartItem$inboundSchema` instead. */
  export const inboundSchema = CartItem$inboundSchema;
  /** @deprecated use `CartItem$outboundSchema` instead. */
  export const outboundSchema = CartItem$outboundSchema;
}
