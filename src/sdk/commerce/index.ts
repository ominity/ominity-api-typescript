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
import { CustomerUsers } from "./customer-users.js";
import { CustomerUserInvitations } from "./customer-user-invitations.js";
import { CustomerUserRoles } from "./customer-user-roles.js";
import { CustomerUserPermissions } from "./customer-user-permissions.js";
import { Customers } from "./customers.js";
import { CustomerAddresses } from "./customer-addresses.js";
import { CustomerGroups } from "./customer-groups.js";
import { CustomerMandates } from "./customer-mandates.js";
import { CustomerPayments } from "./customer-payments.js";
import { CustomerOrders } from "./customer-orders.js";
import { CustomerInvoices } from "./customer-invoices.js";
import { CustomerSubscriptions } from "./customer-subscriptions.js";
import { ShippingClasses } from "./shipping-classes.js";

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
export { CustomerUsers } from "./customer-users.js";
export { CustomerUserInvitations } from "./customer-user-invitations.js";
export { CustomerUserRoles } from "./customer-user-roles.js";
export { CustomerUserPermissions } from "./customer-user-permissions.js";
export { Customers } from "./customers.js";
export { CustomerAddresses } from "./customer-addresses.js";
export { CustomerGroups } from "./customer-groups.js";
export { CustomerMandates } from "./customer-mandates.js";
export { CustomerPayments } from "./customer-payments.js";
export { CustomerOrders } from "./customer-orders.js";
export { CustomerInvoices } from "./customer-invoices.js";
export { CustomerSubscriptions } from "./customer-subscriptions.js";
export { ShippingClasses } from "./shipping-classes.js";

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
  private _customerUsers?: CustomerUsers;
  private _customerUserInvitations?: CustomerUserInvitations;
  private _customerUserRoles?: CustomerUserRoles;
  private _customerUserPermissions?: CustomerUserPermissions;
  private _customers?: Customers;
  private _customerAddresses?: CustomerAddresses;
  private _customerGroups?: CustomerGroups;
  private _customerMandates?: CustomerMandates;
  private _customerPayments?: CustomerPayments;
  private _customerOrders?: CustomerOrders;
  private _customerInvoices?: CustomerInvoices;
  private _customerSubscriptions?: CustomerSubscriptions;
  private _shippingClasses?: ShippingClasses;

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

  get customerUsers(): CustomerUsers {
    return (this._customerUsers ??= new CustomerUsers(this._options));
  }

  get customerUserInvitations(): CustomerUserInvitations {
    return (this._customerUserInvitations ??= new CustomerUserInvitations(this._options));
  }

  get customerUserRoles(): CustomerUserRoles {
    return (this._customerUserRoles ??= new CustomerUserRoles(this._options));
  }

  get customerUserPermissions(): CustomerUserPermissions {
    return (this._customerUserPermissions ??= new CustomerUserPermissions(this._options));
  }

  get customers(): Customers { return (this._customers ??= new Customers(this._options)); }
  get customerAddresses(): CustomerAddresses { return (this._customerAddresses ??= new CustomerAddresses(this._options)); }
  get customerGroups(): CustomerGroups { return (this._customerGroups ??= new CustomerGroups(this._options)); }
  get customerMandates(): CustomerMandates { return (this._customerMandates ??= new CustomerMandates(this._options)); }
  get customerPayments(): CustomerPayments { return (this._customerPayments ??= new CustomerPayments(this._options)); }
  get customerOrders(): CustomerOrders { return (this._customerOrders ??= new CustomerOrders(this._options)); }
  get customerInvoices(): CustomerInvoices { return (this._customerInvoices ??= new CustomerInvoices(this._options)); }
  get customerSubscriptions(): CustomerSubscriptions { return (this._customerSubscriptions ??= new CustomerSubscriptions(this._options)); }
  get shippingClasses(): ShippingClasses { return (this._shippingClasses ??= new ShippingClasses(this._options)); }

  protected override _propagateLanguage(language: string | undefined): void {
    this._cartItems?.setLanguage(language);
    this._carts?.setLanguage(language);
    this._categories?.setLanguage(language);
    this._products?.setLanguage(language);
    this._invoices?.setLanguage(language);
    this._productGroups?.setLanguage(language);
    this._subscriptionIntervals?.setLanguage(language);
    this._orders?.setLanguage(language);
    this._payments?.setLanguage(language);
    this._vatValidations?.setLanguage(language);
    this._shippingMethods?.setLanguage(language);
    this._shippingZones?.setLanguage(language);
    this._reviews?.setLanguage(language);
    this._currencies?.setLanguage(language);
    this._customerUsers?.setLanguage(language);
    this._customerUserInvitations?.setLanguage(language);
    this._customerUserRoles?.setLanguage(language);
    this._customerUserPermissions?.setLanguage(language);
    this._customers?.setLanguage(language);
    this._customerAddresses?.setLanguage(language);
    this._customerGroups?.setLanguage(language);
    this._customerMandates?.setLanguage(language);
    this._customerPayments?.setLanguage(language);
    this._customerOrders?.setLanguage(language);
    this._customerInvoices?.setLanguage(language);
    this._customerSubscriptions?.setLanguage(language);
    this._shippingClasses?.setLanguage(language);
  }
}
