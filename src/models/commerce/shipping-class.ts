import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type ShippingClass = {
  resource: "shipping_class";
  id: number;
  name: string;
  description: string | null;
  updatedAt: string;
  createdAt: string;
  links?: HalLinks;
};

/** @internal */
export const ShippingClass$inboundSchema: z.ZodType<ShippingClass> = z.object({
  resource: z.literal("shipping_class"),
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((value) => remap$(value, { _links: "links" }) as ShippingClass);
