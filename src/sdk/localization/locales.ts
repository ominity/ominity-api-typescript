/*
 * Localization locales SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import {
  localizationLocalesGet,
  localizationLocalesList,
} from "../../funcs/localization/index.js";

export class LocalizationLocales extends ClientSDK {
  async list(
    request?: operations.ListLocalizationLocalesRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListLocalizationLocalesResponse> {
    return unwrapAsync(localizationLocalesList(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetLocalizationLocaleRequest,
    options?: RequestOptions,
  ): Promise<operations.GetLocalizationLocaleResponse> {
    return unwrapAsync(localizationLocalesGet(
      this,
      request,
      options,
    ));
  }
}

