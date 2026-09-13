import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type ShippingZone = {
  resource: "shipping_zone";
  id: number;
  name: string;
  regions: Record<string, unknown>;
  order: number | null;
  isActive: boolean;
  isDefault: boolean;
  updatedAt: string;
  createdAt: string;
  links?: HalLinks | undefined;
};

/** @internal */
export const ShippingZone$inboundSchema: z.ZodType<ShippingZone> = z.object({
  resource: z.literal("shipping_zone"),
  id: z.number().int(),
  name: z.string(),
  regions: z.record(z.string(), z.unknown()),
  order: z.number().nullable(),
  isActive: z.boolean(),
  isDefault: z.boolean(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
}).loose().transform((value) => remap$(value, { _links: "links" }) as ShippingZone);

/** @internal */
export const ShippingZone$outboundSchema = ShippingZone$inboundSchema;
