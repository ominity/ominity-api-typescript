/*
 * Commerce Categories operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Category, Category$inboundSchema } from "../commerce/category.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListCategoriesRequest = {
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

export type ListCategoriesResponse = Paginated<Category>;

/** @internal */
export const ListCategoriesRequest$outboundSchema: z.ZodType<
  ListCategoriesRequest
> = z.object({
  include: z.string().optional(),
  filter: z.record(z.string(), z.any()).optional(),
  sort: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

/** @internal */
export const ListCategoriesResponse$inboundSchema: z.ZodType<
  ListCategoriesResponse
> = z.object({
  _embedded: z.object({
    categories: z.array(Category$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(
    v._embedded.categories,
    v.count,
    v._links,
  )
);

export type GetCategoryRequest = {
  /**
   * Category ID.
   */
  id: number;
  /**
   * Include related resources.
   */
  include?: string | undefined;
};

export type GetCategoryResponse = Category;

/** @internal */
export const GetCategoryRequest$outboundSchema: z.ZodType<
  GetCategoryRequest
> = z.object({
  id: z.number(),
  include: z.string().optional(),
});

/** @internal */
export const GetCategoryResponse$inboundSchema: z.ZodType<
  GetCategoryResponse
> = Category$inboundSchema;
