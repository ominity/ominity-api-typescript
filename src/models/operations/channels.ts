/*
 * Channels operations.
 */

import * as z from "zod/v4";
import {
  Channel,
  ChannelsListResponse,
} from "../channels/index.js";

export type ChannelsListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type ListChannelsRequest = ChannelsListParams;
export type ListChannelsResponse = ChannelsListResponse;

export type GetChannelRequest = {
  id: number | string;
  include?: string | string[] | undefined;
};
export type GetChannelResponse = Channel;

export type GetCurrentChannelRequest = {
  include?: string | string[] | undefined;
};
export type GetCurrentChannelResponse = Channel;

/** @internal */
export const ChannelsListParams$outboundSchema: z.ZodType<ChannelsListParams> =
  z.object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    include: z.union([z.string(), z.array(z.string())]).optional(),
    filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
    sort: z.union([z.string(), z.array(z.string())]).optional(),
  }).loose();

/** @internal */
export const GetChannelRequest$outboundSchema: z.ZodType<GetChannelRequest> = z
  .object({
    id: z.union([z.string(), z.number()]),
    include: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

/** @internal */
export const GetCurrentChannelRequest$outboundSchema: z.ZodType<
  GetCurrentChannelRequest
> = z.object({
  include: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();
