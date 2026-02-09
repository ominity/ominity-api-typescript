/*
 * Commerce Products operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Product, Product$inboundSchema } from "../commerce/product.js";
import { ProductOffer, ProductOffer$inboundSchema } from "../commerce/product-offer.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListProductsRequest = {
  /**
   * Include related resources.
   */
  include?: string | undefined;
  /**
   * Filter by fields.
   */
  filter?: Record<string, any> | undefined;
  /**
   * Sort by fields.
   */
  sort?: string | undefined;
  /**
   * Page number.
   */
  page?: number | undefined;
  /**
   * Page limit.
   */
  limit?: number | undefined;
};

export type ListProductsResponse = Paginated<Product>;

/** @internal */
export const ListProductsRequest$outboundSchema: z.ZodType<
  ListProductsRequest
> = z.object({
  include: z.string().optional(),
  filter: z.record(z.string(), z.any()).optional(),
  sort: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

/** @internal */
export const ListProductsResponse$inboundSchema: z.ZodType<
  ListProductsResponse
> = z.object({
  _embedded: z.object({
    products: z.array(Product$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(
    v._embedded.products,
    v.count,
    v._links,
  )
);

export type GetProductRequest = {
  /**
   * Product ID.
   */
  id: number;
  /**
   * Include related resources.
   */
  include?: string | undefined;
};

export type GetProductResponse = Product;

/** @internal */
export const GetProductRequest$outboundSchema: z.ZodType<
  GetProductRequest
> = z.object({
  id: z.number(),
  include: z.string().optional(),
});

/** @internal */
export const GetProductResponse$inboundSchema: z.ZodType<
  GetProductResponse
> = Product$inboundSchema;

export type ListProductOffersRequest = {
  /**
   * Product ID.
   */
  id: number;
  /**
   * Include related resources.
   */
  include?: string | undefined;
  /**
   * Filter by fields.
   */
  filter?: Record<string, any> | undefined;
  /**
   * Sort by fields.
   */
  sort?: string | undefined;
  /**
   * Page number.
   */
  page?: number | undefined;
  /**
   * Page limit.
   */
  limit?: number | undefined;
};

export type ListProductOffersResponse = Paginated<ProductOffer>;

/** @internal */
export const ListProductOffersRequest$outboundSchema: z.ZodType<
  ListProductOffersRequest
> = z.object({
  id: z.number(),
  include: z.string().optional(),
  filter: z.record(z.string(), z.any()).optional(),
  sort: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

/** @internal */
export const ListProductOffersResponse$inboundSchema: z.ZodType<
  ListProductOffersResponse
> = z.object({
  _embedded: z.object({
    product_offers: z.array(ProductOffer$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(
    v._embedded.product_offers,
    v.count,
    v._links,
  )
);
