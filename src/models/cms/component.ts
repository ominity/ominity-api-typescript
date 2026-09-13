/*
 * CMS Component model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type Component = {
    resource: "component";
    id: number;
    slug: string;
    name: string;
    fields?: Array<unknown>;
    createdAt: string;
    updatedAt: string;
    links?: HalLinks;
};

/** @internal */
export const Component$inboundSchema: z.ZodType<Component> = z.object({
    resource: z.literal("component"),
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    fields: z.array(z.unknown()).optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as Component;
});
