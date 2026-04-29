/*
 * Social Provider Link model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type SocialProviderLink = {
  resource: "socialprovider_link";
  providerId: number;
  redirectUrl: string;
  createdAt: string;
  links?: HalLinks;
};

/** @internal */
export const SocialProviderLink$inboundSchema: z.ZodType<SocialProviderLink> = z
  .object({
    resource: z.literal("socialprovider_link"),
    providerId: z.number().int(),
    redirectUrl: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
  })
  .loose()
  .transform((v) =>
    remap$(v, {
      _links: "links",
    }) as SocialProviderLink
  );
