import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type PaymentMethodIssuer = {
  resource: "paymentmethod_issuer";
  id: number;
  paymentmethodId: number;
  issuer: string;
  name: string;
  icon: string | null;
  isEnabled: boolean;
  updatedAt: string;
  createdAt: string;
  links?: HalLinks;
};

/** @internal */
export const PaymentMethodIssuer$inboundSchema: z.ZodType<PaymentMethodIssuer> = z.object({
  resource: z.literal("paymentmethod_issuer"),
  id: z.number().int(),
  paymentmethodId: z.number().int(),
  issuer: z.string(),
  name: z.string(),
  icon: z.string().nullable(),
  isEnabled: z.boolean(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((value) => remap$(value, { _links: "links" }) as PaymentMethodIssuer);
