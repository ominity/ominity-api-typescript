import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type CustomerGroup = {
  resource: "customer_group";
  id: number;
  name: string;
  description: string | null;
  color: string | null;
  customFields?: Record<string, unknown> | Array<unknown>;
  updatedAt: string;
  createdAt: string;
  links?: HalLinks;
};

/** @internal */
export const CustomerGroup$inboundSchema: z.ZodType<CustomerGroup> = z.object({
  resource: z.literal("customer_group"),
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  color: z.string().nullable(),
  customFields: z.union([z.record(z.string(), z.unknown()), z.array(z.unknown())]).optional(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
}).loose().transform((value) => remap$(value, { _links: "links" }) as CustomerGroup);
