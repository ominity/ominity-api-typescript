/*
 * Channel types operations.
 */

import * as z from "zod/v4";
import {
  ChannelType,
  ChannelTypesListResponse,
} from "../channels/index.js";

export type ChannelTypesListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type ListChannelTypesRequest = ChannelTypesListParams;
export type ListChannelTypesResponse = ChannelTypesListResponse;

export type GetChannelTypeRequest = {
  id: number | string;
  include?: string | string[] | undefined;
};
export type GetChannelTypeResponse = ChannelType;

/** @internal */
export const ChannelTypesListParams$outboundSchema: z.ZodType<
  ChannelTypesListParams
> = z.object({
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  include: z.union([z.string(), z.array(z.string())]).optional(),
  filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  sort: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const GetChannelTypeRequest$outboundSchema: z.ZodType<
  GetChannelTypeRequest
> = z.object({
  id: z.union([z.string(), z.number()]),
  include: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();
