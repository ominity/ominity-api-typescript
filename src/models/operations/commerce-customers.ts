import * as z from "zod/v4";
import { Customer, Customer$inboundSchema } from "../commerce/customer.js";
import { Paginated } from "../pagination.js";
import { ListRequest, ListRequest$outboundSchema, paginatedSchema } from "./helpers.js";

export type CustomerOwnerInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string | null | undefined;
  language?: string | null | undefined;
};

export type CustomerInput = {
  type: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  phone?: string | null | undefined;
  companyVat?: string | null | undefined;
  ownerId?: number | null | undefined;
  owner?: CustomerOwnerInput | undefined;
  billingAddressId?: number | null | undefined;
  billingAddress?: CustomerAddressInput | undefined;
  shippingAddressId?: number | "billingAddress" | null | undefined;
  shippingAddress?: CustomerAddressInput | undefined;
};

export type CustomerAddressInput = {
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  street: string;
  number: string;
  additional: string;
  postalCode: string;
  city: string;
  region?: string | null | undefined;
  country: string;
};

export type ListCustomersRequest = ListRequest;
export type ListCustomersResponse = Paginated<Customer>;
export const ListCustomersRequest$outboundSchema: z.ZodType<ListCustomersRequest> = ListRequest$outboundSchema;
export const ListCustomersResponse$inboundSchema: z.ZodType<ListCustomersResponse> = paginatedSchema("customers", Customer$inboundSchema);

export type GetCustomerRequest = { id: number; include?: string | undefined };
export type GetCustomerResponse = Customer;
export const GetCustomerRequest$outboundSchema: z.ZodType<GetCustomerRequest> = z.object({ id: z.number().int(), include: z.string().optional() });
export const GetCustomerResponse$inboundSchema: z.ZodType<GetCustomerResponse> = Customer$inboundSchema;

export type CreateCustomerRequest = { data: CustomerInput };
export type CreateCustomerResponse = Customer;
const CustomerInput$outboundSchema = z.object({
    type: z.string(), name: z.string().nullable().optional(), email: z.string().email().nullable().optional(),
    phone: z.string().nullable().optional(), companyVat: z.string().nullable().optional(), ownerId: z.number().int().nullable().optional(),
    owner: z.object({ firstName: z.string(), lastName: z.string(), email: z.string().email(), password: z.string(), avatar: z.string().url().nullable().optional(), language: z.string().length(2).nullable().optional() }).optional(),
    billingAddressId: z.number().int().nullable().optional(), billingAddress: z.object({ firstName: z.string().nullable().optional(), lastName: z.string().nullable().optional(), street: z.string(), number: z.string(), additional: z.string(), postalCode: z.string(), city: z.string(), region: z.string().nullable().optional(), country: z.string() }).optional(),
    shippingAddressId: z.union([z.number().int(), z.literal("billingAddress"), z.null()]).optional(), shippingAddress: z.object({ firstName: z.string().nullable().optional(), lastName: z.string().nullable().optional(), street: z.string(), number: z.string(), additional: z.string(), postalCode: z.string(), city: z.string(), region: z.string().nullable().optional(), country: z.string() }).optional(),
});
export const CreateCustomerRequest$outboundSchema: z.ZodType<CreateCustomerRequest> = z.object({
  data: CustomerInput$outboundSchema,
});
export const CreateCustomerResponse$inboundSchema: z.ZodType<CreateCustomerResponse> = Customer$inboundSchema;

export type CustomerUpdateInput = { [Key in keyof Omit<CustomerInput, "owner" | "billingAddress" | "shippingAddress">]?: CustomerInput[Key] | undefined };
export type UpdateCustomerRequest = { id: number; data: CustomerUpdateInput };
export type UpdateCustomerResponse = Customer;
export const UpdateCustomerRequest$outboundSchema: z.ZodType<UpdateCustomerRequest> = z.object({
  id: z.number().int(),
  data: CustomerInput$outboundSchema.partial().omit({ owner: true, billingAddress: true, shippingAddress: true }),
});
export const UpdateCustomerResponse$inboundSchema: z.ZodType<UpdateCustomerResponse> = Customer$inboundSchema;
