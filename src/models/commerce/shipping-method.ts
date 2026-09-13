import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { CurrencyAmount, CurrencyAmount$inboundSchema } from "../common/amount.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type ShippingMethodContext = {
  subtotalAmount: CurrencyAmount;
  taxAmount: CurrencyAmount;
  totalAmount: CurrencyAmount;
  taxRate: number;
};

export type ShippingMethod = {
  resource: "shipping_method";
  id: number;
  zoneId: number;
  classId: number | null;
  deliveryTimeId: number | null;
  name: string;
  description: string | null;
  isEnabled: boolean;
  context?: ShippingMethodContext | undefined;
  updatedAt: string;
  createdAt: string;
  links?: HalLinks | undefined;
};

/** @internal */
export const ShippingMethodContext$inboundSchema: z.ZodType<ShippingMethodContext> = z.object({
  subtotalAmount: CurrencyAmount$inboundSchema,
  taxAmount: CurrencyAmount$inboundSchema,
  totalAmount: CurrencyAmount$inboundSchema,
  taxRate: z.number(),
});

/** @internal */
export const ShippingMethod$inboundSchema: z.ZodType<ShippingMethod> = z.object({
  resource: z.literal("shipping_method"),
  id: z.number().int(),
  zoneId: z.number().int(),
  classId: z.number().int().nullable(),
  deliveryTimeId: z.number().int().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  isEnabled: z.boolean(),
  context: ShippingMethodContext$inboundSchema.optional(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
}).loose().transform((value) => remap$(value, { _links: "links" }) as ShippingMethod);

/** @internal */
export const ShippingMethod$outboundSchema = ShippingMethod$inboundSchema;
