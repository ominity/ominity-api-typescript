/*
 * Channel type model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { buildPaginated, Paginated } from "../pagination.js";
import { Channel, Channel$inboundSchema } from "./channel.js";

export type ChannelType = {
  resource: "channel_type";
  id: number;
  technicalName: string;
  name: string;
  manufacturer?: string | null;
  summary?: string | null;
  description?: string | null;
  coverUrl?: string | null;
  icon?: string | null;
  screenshotUrls?: string[];
  isAvailable: boolean;
  updatedAt?: string;
  createdAt?: string;
  links?: HalLinks;
  channels?: Channel[];
};

/** @internal */
export const ChannelType$inboundSchema: z.ZodType<ChannelType> = z.object({
  resource: z.literal("channel_type"),
  id: z.number().int(),
  technicalName: z.string(),
  name: z.string(),
  manufacturer: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  coverUrl: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  screenshotUrls: z.array(z.string()).optional(),
  isAvailable: z.boolean(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
  _embedded: z.object({
    channels: z.array(z.lazy(() => Channel$inboundSchema)).optional(),
  }).optional(),
})
  .loose()
  .transform((v) => {
    const out = remap$(v, { _links: "links" }) as ChannelType;
    if (v._embedded?.channels) {
      out.channels = v._embedded.channels;
    }
    return out;
  });

export type ChannelTypesListResponse = Paginated<ChannelType>;

/** @internal */
export const ChannelTypesListResponse$inboundSchema: z.ZodType<
  ChannelTypesListResponse
> = z.object({
  _embedded: z.object({
    channel_types: z.array(ChannelType$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(v._embedded.channel_types, v.count, v["_links"])
);
