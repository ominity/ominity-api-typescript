import * as z from "zod/v4";
import { PaymentMethodIssuer, PaymentMethodIssuer$inboundSchema } from "../settings/payment-method-issuer.js";
import { Paginated } from "../pagination.js";
import { ListRequest, ListRequest$outboundSchema, paginatedSchema } from "./helpers.js";

export type ListPaymentMethodIssuersRequest = ListRequest & { methodId: number };
export type ListPaymentMethodIssuersResponse = Paginated<PaymentMethodIssuer>;
export const ListPaymentMethodIssuersRequest$outboundSchema: z.ZodType<ListPaymentMethodIssuersRequest> = ListRequest$outboundSchema.extend({ methodId: z.number().int() });
export const ListPaymentMethodIssuersResponse$inboundSchema = paginatedSchema("paymentmethod_issuers", PaymentMethodIssuer$inboundSchema);
export type GetPaymentMethodIssuerRequest = { methodId: number; id: number };
export type GetPaymentMethodIssuerResponse = PaymentMethodIssuer;
export const GetPaymentMethodIssuerRequest$outboundSchema: z.ZodType<GetPaymentMethodIssuerRequest> = z.object({ methodId: z.number().int(), id: z.number().int() });
export const GetPaymentMethodIssuerResponse$inboundSchema = PaymentMethodIssuer$inboundSchema;
