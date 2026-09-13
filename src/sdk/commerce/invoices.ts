/*
 * Commerce Invoices SDK.
 */

import { invoicesGet } from "../../funcs/commerce/invoicesGet.js";
import { invoicesList } from "../../funcs/commerce/invoicesList.js";
import { invoicesCreate, invoicesDownloadPdf, invoicesUpdate } from "../../funcs/commerce/invoicesMutations.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Invoices extends ClientSDK {
    /**
     * List invoices.
     */
    async list(
        request?: operations.ListInvoicesRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListInvoicesResponse> {
        return unwrapAsync(invoicesList(
            this,
            request,
            options,
        ));
    }

    /**
     * Get invoice.
     */
    async get(
        request: operations.GetInvoiceRequest,
        options?: RequestOptions,
    ): Promise<operations.GetInvoiceResponse> {
        return unwrapAsync(invoicesGet(
            this,
            request,
            options,
        ));
    }

    async create(request: operations.CreateInvoiceRequest, options?: RequestOptions): Promise<operations.CreateInvoiceResponse> {
        return unwrapAsync(invoicesCreate(this, request, options));
    }

    async update(request: operations.UpdateInvoiceRequest, options?: RequestOptions): Promise<operations.UpdateInvoiceResponse> {
        return unwrapAsync(invoicesUpdate(this, request, options));
    }

    async downloadPdf(request: operations.DownloadInvoicePdfRequest, options?: RequestOptions): Promise<Uint8Array> {
        return unwrapAsync(invoicesDownloadPdf(this, request, options));
    }
}
