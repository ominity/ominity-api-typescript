import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { CurrencyAmount, CurrencyAmount$inboundSchema } from "../common/amount.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Product, Product$inboundSchema } from "./product.js";

export type CartItem = {
  resource: "cartitem";
  id: string;
  cartId: string;
  productId: number;
  productOfferId: number | null;
  quantity: number;
  unitAmount: CurrencyAmount;
  discountAmount: CurrencyAmount;
  taxAmount: CurrencyAmount;
  totalAmount: CurrencyAmount;
  isShippingRequired: boolean;
  updatedAt: string;
  createdAt: string;
  /** Present when requested with `include: "product"`. */
  product?: Product;
  links?: HalLinks;
};

/** @internal */
export const CartItem$inboundSchema: z.ZodType<CartItem> = z.object({
  resource: z.literal("cartitem"),
  id: z.string(),
  cartId: z.string(),
  productId: z.number().int(),
  productOfferId: z.number().int().nullable(),
  quantity: z.number(),
  unitAmount: CurrencyAmount$inboundSchema,
  discountAmount: CurrencyAmount$inboundSchema,
  taxAmount: CurrencyAmount$inboundSchema,
  totalAmount: CurrencyAmount$inboundSchema,
  isShippingRequired: z.boolean(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _embedded: z.object({ product: Product$inboundSchema.optional() }).optional(),
  _links: HalLinks$inboundSchema.optional(),
}).loose().transform((value) => {
  const { _embedded, ...rest } = value;
  const item = remap$(rest, { _links: "links" }) as CartItem;
  if (_embedded?.product) item.product = _embedded.product;
  return item;
});
