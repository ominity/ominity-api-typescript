import { customerAddressesCreate, customerAddressesDelete, customerAddressesGet, customerAddressesList, customerAddressesUpdate } from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class CustomerAddresses extends ClientSDK {
  async list(request: operations.ListCustomerAddressesRequest, options?: RequestOptions): Promise<operations.ListCustomerAddressesResponse> { return unwrapAsync(customerAddressesList(this, request, options)); }
  async get(request: operations.GetCustomerAddressRequest, options?: RequestOptions): Promise<operations.GetCustomerAddressResponse> { return unwrapAsync(customerAddressesGet(this, request, options)); }
  async create(request: operations.CreateCustomerAddressRequest, options?: RequestOptions): Promise<operations.CreateCustomerAddressResponse> { return unwrapAsync(customerAddressesCreate(this, request, options)); }
  async update(request: operations.UpdateCustomerAddressRequest, options?: RequestOptions): Promise<operations.UpdateCustomerAddressResponse> { return unwrapAsync(customerAddressesUpdate(this, request, options)); }
  async delete(request: operations.DeleteCustomerAddressRequest, options?: RequestOptions): Promise<void> { return unwrapAsync(customerAddressesDelete(this, request, options)); }
}
