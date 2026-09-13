/*
 * CMS Page Component model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Component, Component$inboundSchema } from "./component.js";
import { PageComponentField, PageComponentField$inboundSchema } from "./page-component-field.js";

export type PageComponent = {
    resource: "page_component";
    id: number;
    pageId: number;
    componentId: number;
    component: Component;
    fields: Record<string, PageComponentField>;
    createdAt: string;
    updatedAt: string;
    links?: HalLinks;
};

/** @internal */
export const PageComponent$inboundSchema: z.ZodType<PageComponent> = z.object({
    resource: z.literal("page_component"),
    id: z.number(),
    pageId: z.number(),
    componentId: z.number(),
    component: Component$inboundSchema,
    fields: z.record(z.string(), PageComponentField$inboundSchema),
    createdAt: z.string(),
    updatedAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as PageComponent;
});
