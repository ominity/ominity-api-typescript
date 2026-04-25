/*
 * Channel system setting model.
 */

import * as z from "zod/v4";

export type ChannelSystemSetting = {
  resource: "channel_system_setting";
  id: number;
  channelId: number;
  group: string;
  name: string;
  payload?: Record<string, unknown> | unknown[] | undefined;
  updatedAt?: string;
  createdAt?: string;
};

/** @internal */
export const ChannelSystemSetting$inboundSchema: z.ZodType<
  ChannelSystemSetting
> = z.object({
  resource: z.literal("channel_system_setting"),
  id: z.number().int(),
  channelId: z.number().int(),
  group: z.string(),
  name: z.string(),
  payload: z.union([z.record(z.string(), z.any()), z.array(z.any())]).optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
}).loose() as unknown as z.ZodType<ChannelSystemSetting>;
