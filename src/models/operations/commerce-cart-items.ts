/*
 * Commerce Cart Items operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { CartItem, CartItem$inboundSchema } from "../commerce/cart-item.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListCartItemsRequest = {
  /**
   * Cart ID.
   */
  cartId: string;
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

export type ListCartItemsResponse = Paginated<CartItem>;

/** @internal */
export const ListCartItemsRequest$outboundSchema: z.ZodType<
  ListCartItemsRequest
> = z.object({
  cartId: z.string(),
  include: z.string().optional(),
  filter: z.record(z.string(), z.any()).optional(),
  sort: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

/** @internal */
export const ListCartItemsResponse$inboundSchema: z.ZodType<
  ListCartItemsResponse
> = z.object({
  _embedded: z.object({
    cart_items: z.array(CartItem$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(
    v._embedded.cart_items,
    v.count,
    v._links,
  )
);

export type GetCartItemRequest = {
  /**
   * Cart ID.
   */
  cartId: string;
  /**
   * Cart Item ID.
   */
  itemId: string;
  /**
   * Include related resources.
   */
  include?: string | undefined;
};

export type GetCartItemResponse = CartItem;

/** @internal */
export const GetCartItemRequest$outboundSchema: z.ZodType<
  GetCartItemRequest
> = z.object({
  cartId: z.string(),
  itemId: z.string(),
  include: z.string().optional(),
});

/** @internal */
export const GetCartItemResponse$inboundSchema: z.ZodType<
  GetCartItemResponse
> = CartItem$inboundSchema;

export type CreateCartItemRequest = {
  cartId: string;
  data: Record<string, any>;
};
export type CreateCartItemResponse = CartItem;

/** @internal */
export const CreateCartItemRequest$outboundSchema: z.ZodType<CreateCartItemRequest> = z.object({
  cartId: z.string(),
  data: z.record(z.string(), z.any()),
});
/** @internal */
export const CreateCartItemResponse$inboundSchema: z.ZodType<CreateCartItemResponse> = CartItem$inboundSchema;

export type UpdateCartItemRequest = {
  cartId: string;
  itemId: string;
  data: Record<string, any>;
};
export type UpdateCartItemResponse = CartItem;

/** @internal */
export const UpdateCartItemRequest$outboundSchema: z.ZodType<UpdateCartItemRequest> = z.object({
  cartId: z.string(),
  itemId: z.string(),
  data: z.record(z.string(), z.any()),
});
/** @internal */
export const UpdateCartItemResponse$inboundSchema: z.ZodType<UpdateCartItemResponse> = CartItem$inboundSchema;

export type DeleteCartItemRequest = {
  cartId: string;
  itemId: string;
};
export type DeleteCartItemResponse = boolean;

/** @internal */
export const DeleteCartItemRequest$outboundSchema: z.ZodType<DeleteCartItemRequest> = z.object({
  cartId: z.string(),
  itemId: z.string(),
});
/** @internal */
export const DeleteCartItemResponse$inboundSchema: z.ZodType<DeleteCartItemResponse> = z.boolean();
