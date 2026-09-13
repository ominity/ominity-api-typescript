import { customerInvoicesDownloadPdf, customerInvoicesGet, customerInvoicesList } from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";
export class CustomerInvoices extends ClientSDK {
  async list(request: operations.ListCustomerInvoicesRequest, options?: RequestOptions): Promise<operations.ListCustomerInvoicesResponse> { return unwrapAsync(customerInvoicesList(this, request, options)); }
  async get(request: operations.GetCustomerInvoiceRequest, options?: RequestOptions): Promise<operations.GetCustomerInvoiceResponse> { return unwrapAsync(customerInvoicesGet(this, request, options)); }
  async downloadPdf(request: operations.DownloadCustomerInvoicePdfRequest, options?: RequestOptions): Promise<Uint8Array> { return unwrapAsync(customerInvoicesDownloadPdf(this, request, options)); }
}
