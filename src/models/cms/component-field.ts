import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type ComponentFieldValidation = {
  regex: string | null;
  required: boolean;
  min: number | null;
  max: number | null;
};

export type ComponentField = {
  resource: "component_field";
  id: number;
  name: string;
  description: string;
  type: string;
  variant: string | null;
  defaultValue: unknown;
  isTranslatable: boolean;
  validation: ComponentFieldValidation;
  updatedAt: string;
  createdAt: string;
  links?: HalLinks;
};

/** @internal */
export const ComponentFieldValidation$inboundSchema: z.ZodType<ComponentFieldValidation> = z.object({
  regex: z.string().nullable(),
  required: z.boolean(),
  min: z.number().nullable(),
  max: z.number().nullable(),
});

/** @internal */
export const ComponentField$inboundSchema: z.ZodType<ComponentField> = z.object({
  resource: z.literal("component_field"),
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  variant: z.string().nullable(),
  defaultValue: z.unknown(),
  isTranslatable: z.boolean(),
  validation: ComponentFieldValidation$inboundSchema,
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((value) => remap$(value, { _links: "links" }) as ComponentField);
