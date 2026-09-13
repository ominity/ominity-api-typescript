import * as z from "zod/v4";
import { Invoice, Invoice$inboundSchema } from "../commerce/invoice.js";
import { Paginated } from "../pagination.js";
import { ListRequest, ListRequest$outboundSchema, paginatedSchema } from "./helpers.js";

export type ListCustomerInvoicesRequest = ListRequest & { customerId: number };
export type ListCustomerInvoicesResponse = Paginated<Invoice>;
export const ListCustomerInvoicesRequest$outboundSchema: z.ZodType<ListCustomerInvoicesRequest> = ListRequest$outboundSchema.extend({ customerId: z.number().int() });
export const ListCustomerInvoicesResponse$inboundSchema = paginatedSchema("invoices", Invoice$inboundSchema);
export type GetCustomerInvoiceRequest = { customerId: number; id: number; include?: string | undefined };
export type GetCustomerInvoiceResponse = Invoice;
export const GetCustomerInvoiceRequest$outboundSchema: z.ZodType<GetCustomerInvoiceRequest> = z.object({ customerId: z.number().int(), id: z.number().int(), include: z.string().optional() });
export const GetCustomerInvoiceResponse$inboundSchema = Invoice$inboundSchema;
export type DownloadCustomerInvoicePdfRequest = { customerId: number; id: number };
export type DownloadCustomerInvoicePdfResponse = Uint8Array;
export const DownloadCustomerInvoicePdfRequest$outboundSchema: z.ZodType<DownloadCustomerInvoicePdfRequest> = z.object({ customerId: z.number().int(), id: z.number().int() });
export const DownloadCustomerInvoicePdfResponse$inboundSchema: z.ZodType<Uint8Array> = z.instanceof(Uint8Array);
