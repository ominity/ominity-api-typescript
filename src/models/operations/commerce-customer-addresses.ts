import * as z from "zod/v4";
import { Address, Address$inboundSchema } from "../commerce/address.js";
import { Paginated } from "../pagination.js";
import { ListRequest, ListRequest$outboundSchema, paginatedSchema } from "./helpers.js";

export type AddressInput = {
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  street: string;
  number: string;
  additional?: string | null | undefined;
  postalCode: string;
  city: string;
  region?: string | null | undefined;
  country: string;
};

const AddressInputSchema = z.object({
  firstName: z.string().nullable().optional(), lastName: z.string().nullable().optional(), street: z.string(), number: z.string(),
  additional: z.string().nullable().optional(), postalCode: z.string(), city: z.string(), region: z.string().nullable().optional(), country: z.string(),
});

export type ListCustomerAddressesRequest = ListRequest & { customerId: number };
export type ListCustomerAddressesResponse = Paginated<Address>;
export const ListCustomerAddressesRequest$outboundSchema: z.ZodType<ListCustomerAddressesRequest> = ListRequest$outboundSchema.extend({ customerId: z.number().int() });
export const ListCustomerAddressesResponse$inboundSchema: z.ZodType<ListCustomerAddressesResponse> = paginatedSchema("addresses", Address$inboundSchema);

export type GetCustomerAddressRequest = { customerId: number; id: number };
export type GetCustomerAddressResponse = Address;
export const GetCustomerAddressRequest$outboundSchema: z.ZodType<GetCustomerAddressRequest> = z.object({ customerId: z.number().int(), id: z.number().int() });
export const GetCustomerAddressResponse$inboundSchema = Address$inboundSchema;

export type CreateCustomerAddressRequest = { customerId: number; data: AddressInput };
export type CreateCustomerAddressResponse = Address;
export const CreateCustomerAddressRequest$outboundSchema: z.ZodType<CreateCustomerAddressRequest> = z.object({ customerId: z.number().int(), data: AddressInputSchema });
export const CreateCustomerAddressResponse$inboundSchema = Address$inboundSchema;

export type AddressUpdateInput = { [Key in keyof AddressInput]?: AddressInput[Key] | undefined };
export type UpdateCustomerAddressRequest = { customerId: number; id: number; data: AddressUpdateInput };
export type UpdateCustomerAddressResponse = Address;
export const UpdateCustomerAddressRequest$outboundSchema: z.ZodType<UpdateCustomerAddressRequest> = z.object({ customerId: z.number().int(), id: z.number().int(), data: AddressInputSchema.partial() });
export const UpdateCustomerAddressResponse$inboundSchema = Address$inboundSchema;

export type DeleteCustomerAddressRequest = { customerId: number; id: number };
export type DeleteCustomerAddressResponse = void;
export const DeleteCustomerAddressRequest$outboundSchema: z.ZodType<DeleteCustomerAddressRequest> = GetCustomerAddressRequest$outboundSchema;
export const DeleteCustomerAddressResponse$inboundSchema: z.ZodType<void> = z.void();
