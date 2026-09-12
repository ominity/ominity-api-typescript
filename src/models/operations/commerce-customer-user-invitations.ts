/*
 * Commerce customer user invitation operations.
 */

import * as z from "zod/v4";
import {
  CustomerUserInvitation,
  CustomerUserInvitation$inboundSchema,
} from "../commerce/customer-user-invitation.js";
import { CustomerUser, CustomerUser$inboundSchema } from "../commerce/customer-user.js";
import { HalLinks$inboundSchema } from "../hal.js";
import { buildPaginated, Paginated } from "../pagination.js";

const invitationAcceptUrlSchema = z.string().refine((value) => {
  try {
    const url = new URL(value.replaceAll("{token}", "invitation-token"));

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}, "Invalid invitation acceptance URL");

export type CreateCustomerUserInvitationRequest = {
  customerId: number;
  data: {
    email: string;
    roleId: number;
    acceptUrl: string;
    language?: string | null | undefined;
  };
};
export type CreateCustomerUserInvitationResponse = CustomerUserInvitation;

/** @internal */
export const CreateCustomerUserInvitationRequest$outboundSchema: z.ZodType<CreateCustomerUserInvitationRequest> = z.object({
  customerId: z.number().int(),
  data: z.object({
    email: z.string().email(),
    roleId: z.number().int(),
    acceptUrl: invitationAcceptUrlSchema,
    language: z.string().nullable().optional(),
  }),
});
/** @internal */
export const CreateCustomerUserInvitationResponse$inboundSchema: z.ZodType<CreateCustomerUserInvitationResponse> = CustomerUserInvitation$inboundSchema;

export type ListCustomerUserInvitationsRequest = {
  customerId: number;
  filter?: {
    id?: number | undefined;
    email?: string | undefined;
    role?: number | undefined;
  } | undefined;
  sort?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};
export type ListCustomerUserInvitationsResponse = Paginated<CustomerUserInvitation>;

/** @internal */
export const ListCustomerUserInvitationsRequest$outboundSchema: z.ZodType<ListCustomerUserInvitationsRequest> = z.object({
  customerId: z.number().int(),
  filter: z.object({
    id: z.number().int().optional(),
    email: z.string().optional(),
    role: z.number().int().optional(),
  }).optional(),
  sort: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

/** @internal */
export const ListCustomerUserInvitationsResponse$inboundSchema: z.ZodType<ListCustomerUserInvitationsResponse> = z.object({
  _embedded: z.object({
    customer_user_invitations: z.array(CustomerUserInvitation$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((value) => buildPaginated(
  value._embedded.customer_user_invitations,
  value.count,
  value._links,
));

export type GetCustomerUserInvitationRequest = {
  customerId: number;
  id: number;
};
export type GetCustomerUserInvitationResponse = CustomerUserInvitation;

/** @internal */
export const GetCustomerUserInvitationRequest$outboundSchema: z.ZodType<GetCustomerUserInvitationRequest> = z.object({
  customerId: z.number().int(),
  id: z.number().int(),
});
/** @internal */
export const GetCustomerUserInvitationResponse$inboundSchema: z.ZodType<GetCustomerUserInvitationResponse> = CustomerUserInvitation$inboundSchema;

export type RevokeCustomerUserInvitationRequest = {
  customerId: number;
  id: number;
};
export type RevokeCustomerUserInvitationResponse = void;

/** @internal */
export const RevokeCustomerUserInvitationRequest$outboundSchema: z.ZodType<RevokeCustomerUserInvitationRequest> = z.object({
  customerId: z.number().int(),
  id: z.number().int(),
});
/** @internal */
export const RevokeCustomerUserInvitationResponse$inboundSchema: z.ZodType<RevokeCustomerUserInvitationResponse> = z.void();

export type InspectCustomerUserInvitationRequest = {
  token: string;
};
export type InspectCustomerUserInvitationResponse = CustomerUserInvitation;

/** @internal */
export const InspectCustomerUserInvitationRequest$outboundSchema: z.ZodType<InspectCustomerUserInvitationRequest> = z.object({
  token: z.string().min(1),
});
/** @internal */
export const InspectCustomerUserInvitationResponse$inboundSchema: z.ZodType<InspectCustomerUserInvitationResponse> = CustomerUserInvitation$inboundSchema;

export type AcceptCustomerUserInvitationRequest = {
  token: string;
  userId?: number | undefined;
};
export type AcceptCustomerUserInvitationResponse = CustomerUser;

/** @internal */
export const AcceptCustomerUserInvitationRequest$outboundSchema: z.ZodType<AcceptCustomerUserInvitationRequest> = z.object({
  token: z.string().length(64),
  userId: z.number().int().optional(),
});
/** @internal */
export const AcceptCustomerUserInvitationResponse$inboundSchema: z.ZodType<AcceptCustomerUserInvitationResponse> = CustomerUser$inboundSchema;
