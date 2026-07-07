/*
 * CMS Content Entry model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Route, Route$inboundSchema } from "../commerce/route.js";

export type ContentEntry<TFields extends Record<string, any> = Record<string, any>> = {
    resource: string;
    id: string;
    route?: Route | null;
    updatedAt: string | null;
    createdAt: string | null;
    links?: HalLinks;
} & TFields;

/** @internal */
export const ContentEntry$inboundSchema: z.ZodType<ContentEntry> = z.object({
    resource: z.string(),
    id: z.string(),
    route: Route$inboundSchema.nullable().optional(),
    updatedAt: z.string().nullable(),
    createdAt: z.string().nullable(),
    _links: HalLinks$inboundSchema.optional(),
}).passthrough().transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as ContentEntry;
}) as unknown as z.ZodType<ContentEntry>;
