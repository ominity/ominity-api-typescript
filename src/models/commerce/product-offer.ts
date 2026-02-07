/*
 * Commerce Product Offer model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { PriceMap, PriceMap$inboundSchema } from "./money.js";

export type ProductOffer = {
  resource: string;
  id: number;
  productId: number;
  type: string;
  intervalId: number | null;
  quantity: number;
  prices: PriceMap;
  links?: HalLinks;
};

/** @internal */
export const ProductOffer$inboundSchema: z.ZodType<ProductOffer> = z.object({
  resource: z.string(),
  id: z.number(),
  productId: z.number(),
  type: z.string(),
  intervalId: z.nullable(z.number()),
  quantity: z.number(),
  prices: PriceMap$inboundSchema,
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
  return remap$(v, {
    "_links": "links",
  }) as ProductOffer;
});
