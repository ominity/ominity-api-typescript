/*
 * SDK module: Commerce
 */

import { ClientSDK } from "../../lib/sdks.js";
import { CartItems } from "./cart-items.js";
import { Carts } from "./carts.js";
import { Categories } from "./categories.js";
import { Products } from "./products.js";
import { Invoices } from "./invoices.js";
import { ProductGroups } from "./product-groups.js";
import { SubscriptionIntervals } from "./subscription-intervals.js";
import { Orders } from "./orders.js";
import { Payments } from "./payments.js";
import { VatValidations } from "./vat-validations.js";
import { ShippingMethods } from "./shipping-methods.js";
import { ShippingZones } from "./shipping-zones.js";
import { Reviews } from "./reviews.js";
import { Currencies } from "./currencies.js";

export { CartItems } from "./cart-items.js";
export { Carts } from "./carts.js";
export { Categories } from "./categories.js";
export { Products } from "./products.js";
export { Invoices } from "./invoices.js";
export { ProductGroups } from "./product-groups.js";
export { SubscriptionIntervals } from "./subscription-intervals.js";
export { Orders } from "./orders.js";
export { Payments } from "./payments.js";
export { VatValidations } from "./vat-validations.js";
export { ShippingMethods } from "./shipping-methods.js";
export { ShippingZones } from "./shipping-zones.js";
export { Reviews } from "./reviews.js";
export { Currencies } from "./currencies.js";

export class Commerce extends ClientSDK {
  private _cartItems?: CartItems;
  private _carts?: Carts;
  private _categories?: Categories;
  private _products?: Products;
  private _invoices?: Invoices;
  private _productGroups?: ProductGroups;
  private _subscriptionIntervals?: SubscriptionIntervals;
  private _orders?: Orders;
  private _payments?: Payments;
  private _vatValidations?: VatValidations;
  private _shippingMethods?: ShippingMethods;
  private _shippingZones?: ShippingZones;
  private _reviews?: Reviews;
  private _currencies?: Currencies;

  get cartItems(): CartItems {
    return (this._cartItems ??= new CartItems(this._options));
  }

  get carts(): Carts {
    return (this._carts ??= new Carts(this._options));
  }

  get categories(): Categories {
    return (this._categories ??= new Categories(this._options));
  }

  get products(): Products {
    return (this._products ??= new Products(this._options));
  }

  get invoices(): Invoices {
    return (this._invoices ??= new Invoices(this._options));
  }

  get productGroups(): ProductGroups {
    return (this._productGroups ??= new ProductGroups(this._options));
  }

  get subscriptionIntervals(): SubscriptionIntervals {
    return (this._subscriptionIntervals ??= new SubscriptionIntervals(this._options));
  }

  get orders(): Orders {
    return (this._orders ??= new Orders(this._options));
  }

  get payments(): Payments {
    return (this._payments ??= new Payments(this._options));
  }

  get vatValidations(): VatValidations {
    return (this._vatValidations ??= new VatValidations(this._options));
  }

  get shippingMethods(): ShippingMethods {
    return (this._shippingMethods ??= new ShippingMethods(this._options));
  }

  get shippingZones(): ShippingZones {
    return (this._shippingZones ??= new ShippingZones(this._options));
  }

  get reviews(): Reviews {
    return (this._reviews ??= new Reviews(this._options));
  }

  get currencies(): Currencies {
    return (this._currencies ??= new Currencies(this._options));
  }
}
