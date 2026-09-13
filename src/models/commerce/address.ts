/*
 * Commerce Address model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type Address = {
  resource?: "address" | undefined;
  id?: number | undefined;
  customerId?: number | undefined;
  firstName: string | null;
  lastName: string | null;
  street: string;
  number: string;
  additional: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  updatedAt?: string | undefined;
  createdAt?: string | undefined;
  links?: HalLinks | undefined;
};

/** @internal */
export const Address$inboundSchema: z.ZodType<Address> = z.object({
  resource: z.literal("address").optional(),
  id: z.number().int().optional(),
  customerId: z.number().int().optional(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  street: z.string(),
  number: z.string(),
  additional: z.string(),
  postalCode: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((value) => remap$(value, { _links: "links" }) as Address);

/** @internal */
export const Address$outboundSchema = z.object({
  resource: z.literal("address").optional(),
  id: z.number().int().optional(),
  customerId: z.number().int().optional(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  street: z.string(),
  number: z.string(),
  additional: z.string(),
  postalCode: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  links: HalLinks$inboundSchema.optional(),
});
