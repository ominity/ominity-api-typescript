/*
 * Commerce Product Group model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type ProductGroup = {
  resource: string;
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parentId: number | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  createdAt: string;
  updatedAt: string;
  links?: HalLinks;
};

/** @internal */
export const ProductGroup$inboundSchema: z.ZodType<ProductGroup> = z.object({
  resource: z.string(),
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.nullable(z.string()),
  parentId: z.nullable(z.number()),
  metaTitle: z.nullable(z.string()),
  metaDescription: z.nullable(z.string()),
  metaKeywords: z.nullable(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
  return remap$(v, {
    "_links": "links",
  }) as ProductGroup;
});
