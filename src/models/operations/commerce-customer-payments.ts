import * as z from "zod/v4";
import { CurrencyAmount$outboundSchema } from "../common/amount.js";
import { Payment, Payment$inboundSchema } from "../commerce/payment.js";
import { Paginated } from "../pagination.js";
import { ListRequest, ListRequest$outboundSchema, paginatedSchema } from "./helpers.js";

export type PaymentInput = {
  type?: string | undefined;
  paymentmethodId: number;
  issuerId?: number | null | undefined;
  redirectUrl: string;
  customerId?: number | null | undefined;
  orderId?: number | undefined;
  mandateId?: number | null | undefined;
  amount?: z.infer<typeof CurrencyAmount$outboundSchema> | undefined;
  invoiceId?: number | null | undefined;
  details?: { cardToken?: string | undefined } | undefined;
};

export const PaymentInput$outboundSchema = z.object({
  type: z.string().optional(), paymentmethodId: z.number().int(), issuerId: z.number().int().nullable().optional(), redirectUrl: z.string().url(),
  customerId: z.number().int().nullable().optional(), orderId: z.number().int().optional(), mandateId: z.number().int().nullable().optional(),
  amount: CurrencyAmount$outboundSchema.optional(), invoiceId: z.number().int().nullable().optional(), details: z.object({ cardToken: z.string().optional() }).optional(),
});

export type ListCustomerPaymentsRequest = ListRequest & { customerId: number };
export type ListCustomerPaymentsResponse = Paginated<Payment>;
export const ListCustomerPaymentsRequest$outboundSchema: z.ZodType<ListCustomerPaymentsRequest> = ListRequest$outboundSchema.extend({ customerId: z.number().int() });
export const ListCustomerPaymentsResponse$inboundSchema = paginatedSchema("payments", Payment$inboundSchema);
export type GetCustomerPaymentRequest = { customerId: number; id: number };
export type GetCustomerPaymentResponse = Payment;
export const GetCustomerPaymentRequest$outboundSchema: z.ZodType<GetCustomerPaymentRequest> = z.object({ customerId: z.number().int(), id: z.number().int() });
export const GetCustomerPaymentResponse$inboundSchema = Payment$inboundSchema;
export type CreateCustomerPaymentRequest = { customerId: number; include?: string | undefined; data: Omit<PaymentInput, "customerId"> };
export type CreateCustomerPaymentResponse = Payment;
export const CreateCustomerPaymentRequest$outboundSchema: z.ZodType<CreateCustomerPaymentRequest> = z.object({ customerId: z.number().int(), include: z.string().optional(), data: PaymentInput$outboundSchema.omit({ customerId: true }) });
export const CreateCustomerPaymentResponse$inboundSchema = Payment$inboundSchema;
export type DeleteCustomerPaymentRequest = { customerId: number; id: number };
export type DeleteCustomerPaymentResponse = void;
export const DeleteCustomerPaymentRequest$outboundSchema: z.ZodType<DeleteCustomerPaymentRequest> = GetCustomerPaymentRequest$outboundSchema;
export const DeleteCustomerPaymentResponse$inboundSchema: z.ZodType<void> = z.void();
