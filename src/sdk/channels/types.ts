/*
 * Channel types SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import { channelTypesGet, channelTypesList } from "../../funcs/channels/index.js";

export class ChannelTypes extends ClientSDK {
  async list(
    request?: operations.ListChannelTypesRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListChannelTypesResponse> {
    return unwrapAsync(channelTypesList(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetChannelTypeRequest,
    options?: RequestOptions,
  ): Promise<operations.GetChannelTypeResponse> {
    return unwrapAsync(channelTypesGet(
      this,
      request,
      options,
    ));
  }
}
