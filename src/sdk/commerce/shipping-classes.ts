import { shippingClassesGet, shippingClassesList } from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class ShippingClasses extends ClientSDK {
  async list(request: operations.ListShippingClassesRequest = {}, options?: RequestOptions): Promise<operations.ListShippingClassesResponse> { return unwrapAsync(shippingClassesList(this, request, options)); }
  async get(request: operations.GetShippingClassRequest, options?: RequestOptions): Promise<operations.GetShippingClassResponse> { return unwrapAsync(shippingClassesGet(this, request, options)); }
}
