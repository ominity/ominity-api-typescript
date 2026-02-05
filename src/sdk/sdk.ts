
import { ClientSDK } from "../lib/sdks.js";
import { Cms } from "./cms/index.js";
import { Commerce } from "./commerce/index.js";
import { Http } from "./http.js";
import { Settings } from "./settings/index.js";

export class Ominity extends ClientSDK {
  private _commerce?: Commerce;
  get commerce(): Commerce {
    return (this._commerce ??= new Commerce(this._options));
  }

  private _cms?: Cms;
  get cms(): Cms {
    return (this._cms ??= new Cms(this._options));
  }

  private _settings?: Settings;
  get settings(): Settings {
    return (this._settings ??= new Settings(this._options));
  }

  private _http?: Http;
  get http(): Http {
    return (this._http ??= new Http(this._options));
  }
}
