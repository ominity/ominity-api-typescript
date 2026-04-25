/*
 * Localization languages SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import {
  localizationLanguagesGet,
  localizationLanguagesList,
} from "../../funcs/localization/index.js";

export class LocalizationLanguages extends ClientSDK {
  async list(
    request?: operations.ListLocalizationLanguagesRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListLocalizationLanguagesResponse> {
    return unwrapAsync(localizationLanguagesList(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetLocalizationLanguageRequest,
    options?: RequestOptions,
  ): Promise<operations.GetLocalizationLanguageResponse> {
    return unwrapAsync(localizationLanguagesGet(
      this,
      request,
      options,
    ));
  }
}

