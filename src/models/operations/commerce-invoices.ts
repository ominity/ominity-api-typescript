/*
 * Commerce Invoices operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Invoice, Invoice$inboundSchema } from "../commerce/invoice.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListInvoicesRequest = {
    /**
     * Include related resources.
     */
    include?: string | undefined;
    /**
     * Filter by fields.
     */
    filter?: Record<string, any> | undefined;
    /**
     * Sort by fields.
     */
    sort?: string | undefined;
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListInvoicesResponse = Paginated<Invoice>;

/** @internal */
export const ListInvoicesRequest$outboundSchema: z.ZodType<
    ListInvoicesRequest
> = z.object({
    include: z.string().optional(),
    filter: z.record(z.string(), z.any()).optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListInvoicesResponse$inboundSchema: z.ZodType<
    ListInvoicesResponse
> = z.object({
    _embedded: z.object({
        invoices: z.array(Invoice$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.invoices,
        v.count,
        v._links,
    )
);

export type GetInvoiceRequest = {
    /**
     * Invoice ID.
     */
    id: number;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetInvoiceResponse = Invoice;

/** @internal */
export const GetInvoiceRequest$outboundSchema: z.ZodType<
    GetInvoiceRequest
> = z.object({
    id: z.number(),
    include: z.string().optional(),
});

/** @internal */
export const GetInvoiceResponse$inboundSchema: z.ZodType<
    GetInvoiceResponse
> = Invoice$inboundSchema;

export type CreateInvoiceRequest = { data: Record<string, unknown> };
export type CreateInvoiceResponse = Invoice;
export const CreateInvoiceRequest$outboundSchema: z.ZodType<CreateInvoiceRequest> = z.object({ data: z.record(z.string(), z.unknown()) });
export const CreateInvoiceResponse$inboundSchema = Invoice$inboundSchema;

export type UpdateInvoiceRequest = { id: number; data: Record<string, unknown> };
export type UpdateInvoiceResponse = Invoice;
export const UpdateInvoiceRequest$outboundSchema: z.ZodType<UpdateInvoiceRequest> = z.object({ id: z.number().int(), data: z.record(z.string(), z.unknown()) });
export const UpdateInvoiceResponse$inboundSchema = Invoice$inboundSchema;

export type DownloadInvoicePdfRequest = { id: number };
export type DownloadInvoicePdfResponse = Uint8Array;
export const DownloadInvoicePdfRequest$outboundSchema: z.ZodType<DownloadInvoicePdfRequest> = z.object({ id: z.number().int() });
export const DownloadInvoicePdfResponse$inboundSchema: z.ZodType<Uint8Array> = z.instanceof(Uint8Array);
