/*
 * CMS Content Type model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import {
    ContentTypeField,
    ContentTypeField$inboundSchema,
} from "./content-type-field.js";

export type ContentTypeRouteConfiguration = {
    name: string;
    parameterFieldSlugs: Array<string>;
};

export type ContentType = {
    resource: string;
    id: number;
    name: string;
    slug: string;
    resourceKey: string | null;
    singularTitle: string | null;
    pluralTitle: string | null;
    description: string | null;
    translatable: boolean;
    routable: boolean;
    route: ContentTypeRouteConfiguration | null;
    showInNavigation: boolean;
    navigationGroup: string | null;
    formLayout: Record<string, any> | Array<any> | null;
    fields?: Array<ContentTypeField>;
    updatedAt: string | null;
    createdAt: string | null;
    links?: HalLinks;
};

/** @internal */
export const ContentTypeRouteConfiguration$inboundSchema: z.ZodType<
    ContentTypeRouteConfiguration
> = z.object({
    name: z.string(),
    parameterFieldSlugs: z.array(z.string()),
});

/** @internal */
export const ContentType$inboundSchema: z.ZodType<ContentType> = z.object({
    resource: z.string(),
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    resourceKey: z.string().nullable(),
    singularTitle: z.string().nullable(),
    pluralTitle: z.string().nullable(),
    description: z.string().nullable(),
    translatable: z.boolean(),
    routable: z.boolean(),
    route: ContentTypeRouteConfiguration$inboundSchema.nullable(),
    showInNavigation: z.boolean(),
    navigationGroup: z.string().nullable(),
    formLayout: z.union([
        z.record(z.string(), z.any()),
        z.array(z.any()),
        z.null(),
    ]),
    fields: z.array(ContentTypeField$inboundSchema).optional(),
    updatedAt: z.string().nullable(),
    createdAt: z.string().nullable(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as ContentType;
});
