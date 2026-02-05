/*
 * SDK module: Commerce
 */

import { ClientSDK } from "../../lib/sdks.js";
import { Products } from "./products.js";

export class Commerce extends ClientSDK {
  private _products?: Products;
  get products(): Products {
    return (this._products ??= new Products(this._options));
  }
}
