import { configuredLanguagesList } from "../../funcs/settings/configuredLanguages.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class ConfiguredLanguages extends ClientSDK {
  async list(request: operations.ListConfiguredLanguagesRequest = {}, options?: RequestOptions): Promise<operations.ListConfiguredLanguagesResponse> { return unwrapAsync(configuredLanguagesList(this, request, options)); }
}
