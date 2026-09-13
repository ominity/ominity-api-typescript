import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type PageComponentField = {
  resource: "page_component_field";
  id: number;
  slug: string;
  type: string;
  pageComponentId: number;
  componentFieldId: number;
  value: unknown;
  updatedAt: string;
  createdAt: string;
  links?: HalLinks;
};

/** @internal */
export const PageComponentField$inboundSchema: z.ZodType<PageComponentField> = z.object({
  resource: z.literal("page_component_field"),
  id: z.number().int(),
  slug: z.string(),
  type: z.string(),
  pageComponentId: z.number().int(),
  componentFieldId: z.number().int(),
  value: z.unknown(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((value) => remap$(value, { _links: "links" }) as PageComponentField);
