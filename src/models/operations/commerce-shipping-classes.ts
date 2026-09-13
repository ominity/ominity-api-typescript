import * as z from "zod/v4";
import { ShippingClass, ShippingClass$inboundSchema } from "../commerce/shipping-class.js";
import { Paginated } from "../pagination.js";
import { ListRequest, ListRequest$outboundSchema, paginatedSchema } from "./helpers.js";

export type ListShippingClassesRequest = ListRequest;
export type ListShippingClassesResponse = Paginated<ShippingClass>;
export const ListShippingClassesRequest$outboundSchema: z.ZodType<ListShippingClassesRequest> = ListRequest$outboundSchema;
export const ListShippingClassesResponse$inboundSchema = paginatedSchema("shipping_classes", ShippingClass$inboundSchema);
export type GetShippingClassRequest = { id: number };
export type GetShippingClassResponse = ShippingClass;
export const GetShippingClassRequest$outboundSchema: z.ZodType<GetShippingClassRequest> = z.object({ id: z.number().int() });
export const GetShippingClassResponse$inboundSchema = ShippingClass$inboundSchema;
