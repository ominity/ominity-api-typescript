/*
 * Customer user invitation model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type CustomerUserInvitationStatus = "pending" | "accepted" | "revoked" | "expired";

export type CustomerUserInvitationCustomer = {
  resource: "customer";
  id: number;
  name: string;
};

export type CustomerUserInvitationRole = {
  resource: "customer_user_role";
  id: number;
  key: string;
  name: string;
  description: string;
};

export type CustomerUserInvitation = {
  resource: "customer_user_invitation";
  id: number;
  customerId: number;
  roleId: number;
  channelId: number | null;
  userId: number | null;
  email: string;
  existingUser: boolean;
  requiresAccountCreation: boolean;
  status: CustomerUserInvitationStatus;
  expiresAt: string;
  acceptedAt: string | null;
  revokedAt: string | null;
  customer?: CustomerUserInvitationCustomer;
  role?: CustomerUserInvitationRole;
  updatedAt: string;
  createdAt: string;
  links?: HalLinks;
};

/** @internal */
export const CustomerUserInvitation$inboundSchema: z.ZodType<CustomerUserInvitation> = z.object({
  resource: z.literal("customer_user_invitation"),
  id: z.number().int(),
  customerId: z.number().int(),
  roleId: z.number().int(),
  channelId: z.number().int().nullable(),
  userId: z.number().int().nullable(),
  email: z.string(),
  existingUser: z.boolean(),
  requiresAccountCreation: z.boolean(),
  status: z.enum(["pending", "accepted", "revoked", "expired"]),
  expiresAt: z.string(),
  acceptedAt: z.string().nullable(),
  revokedAt: z.string().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
  _embedded: z.object({
    customer: z.object({
      resource: z.literal("customer"),
      id: z.number().int(),
      name: z.string(),
    }).loose().optional(),
    role: z.object({
      resource: z.literal("customer_user_role"),
      id: z.number().int(),
      key: z.string(),
      name: z.string(),
      description: z.string(),
    }).loose().optional(),
  }).loose().optional(),
}).loose().transform((value) => {
  const embedded = value._embedded;
  const invitation = remap$(value, {
    "_links": "links",
    "_embedded": null,
  }) as CustomerUserInvitation;

  if (embedded?.customer) {
    invitation.customer = embedded.customer;
  }

  if (embedded?.role) {
    invitation.role = embedded.role;
  }

  return invitation;
}) as unknown as z.ZodType<CustomerUserInvitation>;
