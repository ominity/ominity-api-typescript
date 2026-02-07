/*
 * Commerce Address model.
 */

import * as z from "zod/v4";

export type Address = {
  firstName: string;
  lastName: string;
  street: string;
  number: string;
  additional: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
};

/** @internal */
export const Address$inboundSchema: z.ZodType<Address> = z.object({
  firstName: z.string(),
  lastName: z.string(),
  street: z.string(),
  number: z.string(),
  additional: z.string(),
  postalCode: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
});

/** @internal */
export const Address$outboundSchema: z.ZodType<Address> = z.object({
  firstName: z.string(),
  lastName: z.string(),
  street: z.string(),
  number: z.string(),
  additional: z.string(),
  postalCode: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
});
