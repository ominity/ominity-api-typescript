/*
 * Commerce Categories SDK.
 */

import { categoriesList } from "../../funcs/commerce/categoriesList.js";
import { categoriesGet } from "../../funcs/commerce/categoriesGet.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Categories extends ClientSDK {
  async list(
    request?: operations.ListCategoriesRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListCategoriesResponse> {
    return unwrapAsync(categoriesList(this, request, options));
  }

  async get(
    request: operations.GetCategoryRequest,
    options?: RequestOptions,
  ): Promise<operations.GetCategoryResponse> {
    return unwrapAsync(categoriesGet(this, request, options));
  }
}
