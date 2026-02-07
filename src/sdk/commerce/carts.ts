/*
 * Commerce Carts SDK.
 */

import { cartsList } from "../../funcs/commerce/cartsList.js";
import { cartsCreate } from "../../funcs/commerce/cartsCreate.js";
import { cartsGet } from "../../funcs/commerce/cartsGet.js";
import { cartsUpdate } from "../../funcs/commerce/cartsUpdate.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Carts extends ClientSDK {
  /**
   * List carts.
   */
  async list(
    request?: operations.ListCartsRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListCartsResponse> {
    return unwrapAsync(cartsList(
      this,
      request,
      options,
    ));
  }

  /**
   * Create cart.
   */
  async create(
    request: operations.CreateCartRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateCartResponse> {
    return unwrapAsync(cartsCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * Get cart.
   */
  async get(
    id: string,
    options?: RequestOptions & { include?: string },
  ): Promise<operations.GetCartResponse> {
    return unwrapAsync(cartsGet(
      this,
      { id, include: options?.include },
      options,
    ));
  }

  /**
   * Update cart.
   */
  async update(
    id: string,
    data: Record<string, any>,
    options?: RequestOptions,
  ): Promise<operations.UpdateCartResponse> {
    return unwrapAsync(cartsUpdate(
      this,
      { id, data },
      options,
    ));
  }
}
