/*
 * CMS Content Type Field model.
 */

import * as z from "zod/v4";

export type ContentTypeField = {
    resource: string;
    id: number;
    name: string;
    slug: string;
    description: string | null;
    type: string;
    variant: string | null;
    required: boolean;
    translatable: boolean;
    isRouteParameter: boolean;
    showInTable: boolean;
    multiple: boolean;
    multipleSortable: boolean;
    min: unknown;
    max: unknown;
    defaultValue: unknown;
    data: unknown;
    order: number;
    parentId: number | null;
    updatedAt: string | null;
    createdAt: string | null;
};

/** @internal */
export const ContentTypeField$inboundSchema: z.ZodType<ContentTypeField> = z.object({
    resource: z.string(),
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
    type: z.string(),
    variant: z.string().nullable(),
    required: z.boolean(),
    translatable: z.boolean(),
    isRouteParameter: z.boolean(),
    showInTable: z.boolean(),
    multiple: z.boolean(),
    multipleSortable: z.boolean(),
    min: z.unknown(),
    max: z.unknown(),
    defaultValue: z.unknown(),
    data: z.unknown(),
    order: z.number(),
    parentId: z.number().nullable(),
    updatedAt: z.string().nullable(),
    createdAt: z.string().nullable(),
});
