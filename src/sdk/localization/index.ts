/*
 * SDK module: Localization
 */

import { ClientSDK } from "../../lib/sdks.js";
import { LocalizationLanguages } from "./languages.js";
import { LocalizationLocales } from "./locales.js";

export class Localization extends ClientSDK {
  private _languages?: LocalizationLanguages;
  private _locales?: LocalizationLocales;

  get languages(): LocalizationLanguages {
    return (this._languages ??= new LocalizationLanguages(this._options));
  }

  get locales(): LocalizationLocales {
    return (this._locales ??= new LocalizationLocales(this._options));
  }
}

