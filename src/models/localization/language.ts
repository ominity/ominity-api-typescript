/*
 * Localization language model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { buildPaginated, Paginated } from "../pagination.js";
import { Locale, Locale$inboundSchema } from "./locale.js";

export type Language = {
  resource: "language";
  id: number;
  code: string;
  name: string;
  direction: string;
  localeId: number;
  flag?: string | null;
  isActive: boolean;
  parentId?: number | null;
  updatedAt?: string;
  createdAt?: string;
  links?: HalLinks;
  locale?: Locale;
  parent?: Language | null;
  children?: Language[];
};

/** @internal */
export const Language$inboundSchema: z.ZodType<Language> = z.object({
  resource: z.literal("language"),
  id: z.number().int(),
  code: z.string(),
  name: z.string(),
  direction: z.string(),
  localeId: z.number().int(),
  flag: z.string().nullable().optional(),
  isActive: z.boolean(),
  parentId: z.number().int().nullable().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
  _embedded: z.object({
    locale: z.lazy(() => Locale$inboundSchema).optional(),
    parent: z.lazy(() => Language$inboundSchema).nullable().optional(),
    children: z.array(z.lazy(() => Language$inboundSchema)).optional(),
  }).optional(),
})
  .loose()
  .transform((v) => {
    const out = remap$(v, { _links: "links" }) as Language;
    const embedded = v["_embedded"];
    if (embedded?.locale) {
      out.locale = embedded.locale;
    }
    if (typeof embedded?.parent !== "undefined") {
      out.parent = embedded.parent;
    }
    if (embedded?.children) {
      out.children = embedded.children;
    }
    return out;
  });

export type LanguagesListResponse = Paginated<Language>;

/** @internal */
export const LanguagesListResponse$inboundSchema: z.ZodType<
  LanguagesListResponse
> = z.object({
  _embedded: z.object({
    languages: z.array(Language$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(v._embedded.languages, v.count, v["_links"])
);

