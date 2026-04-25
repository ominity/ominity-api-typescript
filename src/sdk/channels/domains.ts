/*
 * Channel domains SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import {
  channelDomainsGet,
  channelDomainsList,
} from "../../funcs/channels/index.js";

export class ChannelDomains extends ClientSDK {
  async list(
    request: operations.ListChannelDomainsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListChannelDomainsResponse> {
    return unwrapAsync(channelDomainsList(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetChannelDomainRequest,
    options?: RequestOptions,
  ): Promise<operations.GetChannelDomainResponse> {
    return unwrapAsync(channelDomainsGet(
      this,
      request,
      options,
    ));
  }
}
