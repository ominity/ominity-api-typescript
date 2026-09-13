/*
 * CMS Components operations.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { buildPaginated, Paginated } from "../pagination.js";
import { Component, Component$inboundSchema } from "../cms/component.js";
import { HalLinks$inboundSchema } from "../hal.js";
import { ComponentField, ComponentField$inboundSchema } from "../cms/component-field.js";

export type ListComponentsRequest = {
    /**
     * Filter by component ID.
     */
    filterId?: number | undefined;
    /**
     * Filter by component slug.
     */
    filterSlug?: string | undefined;
    /**
     * Filter by component name.
     */
    filterName?: string | undefined;
    /**
     * Include related resources.
     */
    include?: string | undefined;
    /**
     * Sort results.
     */
    sort?: string | undefined;
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListComponentsResponse = Paginated<Component>;

/** @internal */
export const ListComponentsRequest$outboundSchema: z.ZodType<
    ListComponentsRequest
> = z.object({
    filterId: z.number().optional(),
    filterSlug: z.string().optional(),
    filterName: z.string().optional(),
    include: z.string().optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
}).transform((v) => {
    return remap$(v, {
        filterId: "filter[id]",
        filterSlug: "filter[slug]",
        filterName: "filter[name]",
    });
});

/** @internal */
export const ListComponentsResponse$inboundSchema: z.ZodType<
    ListComponentsResponse
> = z.object({
    _embedded: z.object({
        components: z.array(Component$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.components,
        v.count,
        v._links,
    )
);

export type GetComponentRequest = {
    /**
     * Component ID.
     */
    id: number;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetComponentResponse = Component;

/** @internal */
export const GetComponentRequest$outboundSchema: z.ZodType<
    GetComponentRequest
> = z.object({
    id: z.number(),
    include: z.string().optional(),
});

/** @internal */
export const GetComponentResponse$inboundSchema: z.ZodType<
    GetComponentResponse
> = Component$inboundSchema;

export type ListComponentFieldsRequest = { componentId: number; filter?: Record<string, unknown> | undefined; sort?: string | undefined; page?: number | undefined; limit?: number | undefined };
export type ListComponentFieldsResponse = Paginated<ComponentField>;
export const ListComponentFieldsRequest$outboundSchema: z.ZodType<ListComponentFieldsRequest> = z.object({ componentId: z.number().int(), filter: z.record(z.string(), z.unknown()).optional(), sort: z.string().optional(), page: z.number().int().positive().optional(), limit: z.number().int().positive().max(250).optional() });
export const ListComponentFieldsResponse$inboundSchema: z.ZodType<ListComponentFieldsResponse> = z.object({
    _embedded: z.object({ component_fields: z.array(ComponentField$inboundSchema) }), count: z.number(), _links: HalLinks$inboundSchema.optional(),
}).transform((value) => buildPaginated(value._embedded.component_fields, value.count, value._links));

export type GetComponentFieldRequest = { componentId: number; id: number };
export type GetComponentFieldResponse = ComponentField;
export const GetComponentFieldRequest$outboundSchema: z.ZodType<GetComponentFieldRequest> = z.object({ componentId: z.number().int(), id: z.number().int() });
export const GetComponentFieldResponse$inboundSchema = ComponentField$inboundSchema;
