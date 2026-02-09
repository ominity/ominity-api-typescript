/*
 * Commerce Products SDK.
 */

import { productsList } from "../../funcs/commerce/productsList.js";
import { productsGet } from "../../funcs/commerce/productsGet.js";
import { productsOffersList } from "../../funcs/commerce/productsOffersList.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Products extends ClientSDK {
  async list(
    request?: operations.ListProductsRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListProductsResponse> {
    return unwrapAsync(productsList(this, request, options));
  }

  async get(
    request: operations.GetProductRequest,
    options?: RequestOptions,
  ): Promise<operations.GetProductResponse> {
    return unwrapAsync(productsGet(this, request, options));
  }

  async listOffers(
    request: operations.ListProductOffersRequest,
    options?: RequestOptions,
  ): Promise<operations.ListProductOffersResponse> {
    return unwrapAsync(productsOffersList(this, request, options));
  }
}
