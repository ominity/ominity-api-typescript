import { translationsBulk } from "../funcs/translations.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
export class Translations extends ClientSDK {
  async bulk(request: operations.BulkTranslateRequest, options?: RequestOptions): Promise<operations.BulkTranslateResponse> { return unwrapAsync(translationsBulk(this, request, options)); }
}
