/*
 * SDK module: Channels
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import {
  channelsCurrent,
  channelsGet,
  channelsList,
} from "../../funcs/channels/index.js";
import { ChannelDomains } from "./domains.js";
import { ChannelTypes } from "./types.js";

export class Channels extends ClientSDK {
  private _types?: ChannelTypes;
  private _domains?: ChannelDomains;

  get types(): ChannelTypes {
    return (this._types ??= new ChannelTypes(this._options));
  }

  get domains(): ChannelDomains {
    return (this._domains ??= new ChannelDomains(this._options));
  }

  async list(
    request?: operations.ListChannelsRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListChannelsResponse> {
    return unwrapAsync(channelsList(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetChannelRequest,
    options?: RequestOptions,
  ): Promise<operations.GetChannelResponse> {
    return unwrapAsync(channelsGet(
      this,
      request,
      options,
    ));
  }

  async current(
    request?: operations.GetCurrentChannelRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.GetCurrentChannelResponse> {
    return unwrapAsync(channelsCurrent(
      this,
      request,
      options,
    ));
  }

  protected override _propagateLanguage(language: string | undefined): void {
    this._types?.setLanguage(language);
    this._domains?.setLanguage(language);
  }
}
