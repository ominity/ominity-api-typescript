/*
 * Commerce Cart Items SDK.
 */

import { cartItemsList } from "../../funcs/commerce/cartItemsList.js";
import { cartItemsCreate } from "../../funcs/commerce/cartItemsCreate.js";
import { cartItemsGet } from "../../funcs/commerce/cartItemsGet.js";
import { cartItemsUpdate } from "../../funcs/commerce/cartItemsUpdate.js";
import { cartItemsDelete } from "../../funcs/commerce/cartItemsDelete.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class CartItems extends ClientSDK {
  /**
   * List cart items.
   */
  async list(
    cartId: string,
    request?: operations.ListCartItemsRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListCartItemsResponse> {
    return unwrapAsync(cartItemsList(
      this,
      { ...request, cartId },
      options,
    ));
  }

  /**
   * Create cart item.
   */
  async create(
    cartId: string,
    productId: string,
    quantity: number,
    options?: RequestOptions,
  ): Promise<operations.CreateCartItemResponse> {
    return unwrapAsync(cartItemsCreate(
      this,
      { cartId, data: { product_id: productId, quantity } },
      options,
    ));
  }

  /**
   * Get cart item.
   */
  async get(
    cartId: string,
    itemId: string,
    options?: RequestOptions & { include?: string },
  ): Promise<operations.GetCartItemResponse> {
    return unwrapAsync(cartItemsGet(
      this,
      { cartId, itemId, include: options?.include },
      options,
    ));
  }

  /**
   * Update cart item.
   */
  async update(
    cartId: string,
    itemId: string,
    data: Record<string, any>,
    options?: RequestOptions,
  ): Promise<operations.UpdateCartItemResponse> {
    return unwrapAsync(cartItemsUpdate(
      this,
      { cartId, itemId, data },
      options,
    ));
  }

  /**
   * Delete cart item.
   */
  async delete(
    cartId: string,
    itemId: string,
    options?: RequestOptions,
  ): Promise<operations.DeleteCartItemResponse> {
    return unwrapAsync(cartItemsDelete(
      this,
      { cartId, itemId },
      options,
    ));
  }
}
