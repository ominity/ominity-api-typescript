/*
 * Channel domain model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { Currency, Currency$inboundSchema } from "../commerce/currency.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Language, Language$inboundSchema } from "../localization/language.js";
import { buildPaginated, Paginated } from "../pagination.js";
import { Channel, Channel$inboundSchema } from "./channel.js";

export type ChannelDomain = {
  resource: "channel_domain";
  id: number;
  channelId: number;
  url: string;
  languageId?: number | null;
  currencyId?: number | null;
  hreflangLocaleOnly: boolean;
  updatedAt?: string;
  createdAt?: string;
  links?: HalLinks;
  channel?: Channel;
  language?: Language;
  currency?: Currency;
};

/** @internal */
export const ChannelDomain$inboundSchema: z.ZodType<ChannelDomain> = z.object({
  resource: z.literal("channel_domain"),
  id: z.number().int(),
  channelId: z.number().int(),
  url: z.string(),
  languageId: z.number().int().nullable().optional(),
  currencyId: z.number().int().nullable().optional(),
  hreflangLocaleOnly: z.boolean(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
  _embedded: z.object({
    channel: z.lazy(() => Channel$inboundSchema).optional(),
    language: z.lazy(() => Language$inboundSchema).optional(),
    currency: z.lazy(() => Currency$inboundSchema).optional(),
  }).optional(),
})
  .loose()
  .transform((v) => {
    const out = remap$(v, { _links: "links" }) as ChannelDomain;
    if (v._embedded?.channel) {
      out.channel = v._embedded.channel;
    }
    if (v._embedded?.language) {
      out.language = v._embedded.language;
    }
    if (v._embedded?.currency) {
      out.currency = v._embedded.currency;
    }
    return out;
  });

export type ChannelDomainsListResponse = Paginated<ChannelDomain>;

/** @internal */
export const ChannelDomainsListResponse$inboundSchema: z.ZodType<
  ChannelDomainsListResponse
> = z.object({
  _embedded: z.object({
    domains: z.array(ChannelDomain$inboundSchema).optional(),
    channel_domains: z.array(ChannelDomain$inboundSchema).optional(),
  }).refine((embedded) =>
    Array.isArray(embedded.domains) || Array.isArray(embedded.channel_domains)
  ),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
  const items = v._embedded.domains ?? v._embedded.channel_domains ?? [];
  return buildPaginated(items, v.count, v["_links"]);
});
