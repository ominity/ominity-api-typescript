import * as z from "zod/v4";
import { Mandate, Mandate$inboundSchema } from "../commerce/mandate.js";
import { Paginated } from "../pagination.js";
import { ListRequest, ListRequest$outboundSchema, paginatedSchema } from "./helpers.js";

export type ListCustomerMandatesRequest = ListRequest & { customerId: number };
export type ListCustomerMandatesResponse = Paginated<Mandate>;
export const ListCustomerMandatesRequest$outboundSchema: z.ZodType<ListCustomerMandatesRequest> = ListRequest$outboundSchema.extend({ customerId: z.number().int() });
export const ListCustomerMandatesResponse$inboundSchema = paginatedSchema("mandates", Mandate$inboundSchema);

export type GetCustomerMandateRequest = { customerId: number; id: number };
export type GetCustomerMandateResponse = Mandate;
export const GetCustomerMandateRequest$outboundSchema: z.ZodType<GetCustomerMandateRequest> = z.object({ customerId: z.number().int(), id: z.number().int() });
export const GetCustomerMandateResponse$inboundSchema = Mandate$inboundSchema;

export type CreateCustomerMandateRequest = { customerId: number; data: Record<string, unknown> };
export type CreateCustomerMandateResponse = Mandate;
export const CreateCustomerMandateRequest$outboundSchema: z.ZodType<CreateCustomerMandateRequest> = z.object({ customerId: z.number().int(), data: z.record(z.string(), z.unknown()) });
export const CreateCustomerMandateResponse$inboundSchema = Mandate$inboundSchema;

export type UpdateCustomerMandateRequest = { customerId: number; id: number; data: Record<string, unknown> };
export type UpdateCustomerMandateResponse = Mandate;
export const UpdateCustomerMandateRequest$outboundSchema: z.ZodType<UpdateCustomerMandateRequest> = z.object({ customerId: z.number().int(), id: z.number().int(), data: z.record(z.string(), z.unknown()) });
export const UpdateCustomerMandateResponse$inboundSchema = Mandate$inboundSchema;

export type DeleteCustomerMandateRequest = { customerId: number; id: number };
export type DeleteCustomerMandateResponse = void;
export const DeleteCustomerMandateRequest$outboundSchema: z.ZodType<DeleteCustomerMandateRequest> = GetCustomerMandateRequest$outboundSchema;
export const DeleteCustomerMandateResponse$inboundSchema: z.ZodType<void> = z.void();
