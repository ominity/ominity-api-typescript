/*
 * Channel domains operations.
 */

import * as z from "zod/v4";
import {
  ChannelDomain,
  ChannelDomainsListResponse,
} from "../channels/index.js";

export type ChannelDomainsListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type ListChannelDomainsRequest = ChannelDomainsListParams & {
  channelId: number | string;
};
export type ListChannelDomainsResponse = ChannelDomainsListResponse;

export type GetChannelDomainRequest = {
  channelId: number | string;
  id: number | string;
  include?: string | string[] | undefined;
};
export type GetChannelDomainResponse = ChannelDomain;

/** @internal */
export const ChannelDomainsListParams$outboundSchema: z.ZodType<
  ChannelDomainsListParams
> = z.object({
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  include: z.union([z.string(), z.array(z.string())]).optional(),
  filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  sort: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const ListChannelDomainsRequest$outboundSchema: z.ZodType<
  ListChannelDomainsRequest
> = z.object({
  channelId: z.union([z.string(), z.number()]),
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  include: z.union([z.string(), z.array(z.string())]).optional(),
  filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  sort: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const GetChannelDomainRequest$outboundSchema: z.ZodType<
  GetChannelDomainRequest
> = z.object({
  channelId: z.union([z.string(), z.number()]),
  id: z.union([z.string(), z.number()]),
  include: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();
