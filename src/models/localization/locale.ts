/*
 * Localization locale model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { buildPaginated, Paginated } from "../pagination.js";
import { Language, Language$inboundSchema } from "./language.js";

export type Locale = {
  resource: "locale";
  id: number;
  code: string;
  name: string;
  territory?: string | null;
  updatedAt?: string;
  createdAt?: string;
  links?: HalLinks;
  languages?: Language[];
};

/** @internal */
export const Locale$inboundSchema: z.ZodType<Locale> = z.object({
  resource: z.literal("locale"),
  id: z.number().int(),
  code: z.string(),
  name: z.string(),
  territory: z.string().nullable().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
  _embedded: z.object({
    languages: z.array(z.lazy(() => Language$inboundSchema)).optional(),
  }).optional(),
})
  .loose()
  .transform((v) => {
    const out = remap$(v, { _links: "links" }) as Locale;
    const embedded = v["_embedded"];
    if (embedded?.languages) {
      out.languages = embedded.languages;
    }
    return out;
  });

export type LocalesListResponse = Paginated<Locale>;

/** @internal */
export const LocalesListResponse$inboundSchema: z.ZodType<
  LocalesListResponse
> = z.object({
  _embedded: z.object({
    locales: z.array(Locale$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(v._embedded.locales, v.count, v["_links"])
);

