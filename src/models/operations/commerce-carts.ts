/*
 * Commerce Carts operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Cart, Cart$inboundSchema } from "../commerce/cart.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListCartsRequest = {
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

export type ListCartsResponse = Paginated<Cart>;

/** @internal */
export const ListCartsRequest$outboundSchema: z.ZodType<
  ListCartsRequest
> = z.object({
  include: z.string().optional(),
  filter: z.record(z.string(), z.any()).optional(),
  sort: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

/** @internal */
export const ListCartsResponse$inboundSchema: z.ZodType<
  ListCartsResponse
> = z.object({
  _embedded: z.object({
    carts: z.array(Cart$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(
    v._embedded.carts,
    v.count,
    v._links,
  )
);

export type GetCartRequest = {
  /**
   * Cart ID.
   */
  id: string;
  /**
   * Include related resources.
   */
  include?: string | undefined;
};

export type GetCartResponse = Cart;

/** @internal */
export const GetCartRequest$outboundSchema: z.ZodType<
  GetCartRequest
> = z.object({
  id: z.string(),
  include: z.string().optional(),
});

/** @internal */
export const GetCartResponse$inboundSchema: z.ZodType<
  GetCartResponse
> = Cart$inboundSchema;

export type CreateCartRequest = Record<string, any>;
export type CreateCartResponse = Cart;

/** @internal */
export const CreateCartRequest$outboundSchema: z.ZodType<CreateCartRequest> = z.record(z.string(), z.any());
/** @internal */
export const CreateCartResponse$inboundSchema: z.ZodType<CreateCartResponse> = Cart$inboundSchema;

export type UpdateCartRequest = {
  id: string;
  data: Record<string, any>;
};
export type UpdateCartResponse = Cart;

/** @internal */
export const UpdateCartRequest$outboundSchema: z.ZodType<UpdateCartRequest> = z.object({
  id: z.string(),
  data: z.record(z.string(), z.any()),
});
/** @internal */
export const UpdateCartResponse$inboundSchema: z.ZodType<UpdateCartResponse> = Cart$inboundSchema;
