import { cmsRoutesGet, cmsRoutesList } from "../../funcs/cms/routes.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class Routes extends ClientSDK {
  async list(request: operations.ListCmsRoutesRequest = {}, options?: RequestOptions): Promise<operations.ListCmsRoutesResponse> { return unwrapAsync(cmsRoutesList(this, request, options)); }
  async get(request: operations.GetCmsRouteRequest, options?: RequestOptions): Promise<operations.GetCmsRouteResponse> { return unwrapAsync(cmsRoutesGet(this, request, options)); }
}
