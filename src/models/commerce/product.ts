/*
 * Commerce Product model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type ProductRoute = {
  resource: string;
  name: string;
  locale: string;
  parameters: Record<string, any>;
};

export type ProductMeasurement = {
  value: number;
  unit: string;
};

export type ProductMeasurements = {
  height?: ProductMeasurement;
  width?: ProductMeasurement;
  depth?: ProductMeasurement;
  weight?: ProductMeasurement;
};

export type ProductReviewBreakdown = {
  rating: number;
  count: number;
};

export type ProductReviews = {
  total: number;
  rating: number | null;
  breakdown: Array<ProductReviewBreakdown>;
};

export type Product = {
  resource: string;
  id: number;
  sku: string;
  ean: string | null;
  mpn: string | null;
  asin: string | null;
  title: string;
  shortTitle: string | null;
  coverImage: string | null;
  additionalImages: Array<string>;
  shortDescription: string | null;
  description: string | null;
  bulletpoints: Array<string>;
  boxContent: string | null;
  type: string;
  condition: string;
  categoryId: number;
  stock: number;
  isBackorderAllowed: boolean;
  routes: Record<string, ProductRoute>;
  measurements?: ProductMeasurements;
  reviews?: ProductReviews;
  searches: Array<string>;
  customFields: Array<any>;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
  links?: HalLinks;
};

/** @internal */
export const ProductRoute$inboundSchema: z.ZodType<ProductRoute> = z.object({
  resource: z.string(),
  name: z.string(),
  locale: z.string(),
  parameters: z.record(z.string(), z.any()),
});

/** @internal */
export const ProductMeasurement$inboundSchema: z.ZodType<ProductMeasurement> = z.object({
  value: z.number(),
  unit: z.string(),
});

/** @internal */
export const ProductMeasurements$inboundSchema: z.ZodType<ProductMeasurements> = z.object({
  height: ProductMeasurement$inboundSchema.optional(),
  width: ProductMeasurement$inboundSchema.optional(),
  depth: ProductMeasurement$inboundSchema.optional(),
  weight: ProductMeasurement$inboundSchema.optional(),
}) as unknown as z.ZodType<ProductMeasurements>;

/** @internal */
export const ProductReviewBreakdown$inboundSchema: z.ZodType<ProductReviewBreakdown> = z.object({
  rating: z.number(),
  count: z.number(),
});

/** @internal */
export const ProductReviews$inboundSchema: z.ZodType<ProductReviews> = z.object({
  total: z.number(),
  rating: z.nullable(z.number()),
  breakdown: z.array(ProductReviewBreakdown$inboundSchema),
});

/** @internal */
export const Product$inboundSchema: z.ZodType<Product> = z.object({
  resource: z.string(),
  id: z.number(),
  sku: z.string(),
  ean: z.nullable(z.string()),
  mpn: z.nullable(z.string()),
  asin: z.nullable(z.string()),
  title: z.string(),
  shortTitle: z.nullable(z.string()),
  coverImage: z.nullable(z.string()),
  additionalImages: z.array(z.string()),
  shortDescription: z.nullable(z.string()),
  description: z.nullable(z.string()),
  bulletpoints: z.array(z.string()),
  boxContent: z.nullable(z.string()),
  type: z.string(),
  condition: z.string(),
  categoryId: z.number(),
  stock: z.number(),
  isBackorderAllowed: z.boolean(),
  routes: z.record(z.string(), ProductRoute$inboundSchema),
  measurements: ProductMeasurements$inboundSchema.optional(),
  reviews: ProductReviews$inboundSchema.optional(),
  searches: z.array(z.string()),
  customFields: z.array(z.any()),
  publishedAt: z.nullable(z.string()),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
  return remap$(v, {
    "_links": "links",
  }) as Product;
});
