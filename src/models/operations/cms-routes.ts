import * as z from "zod/v4";
import { Route, Route$inboundSchema } from "../commerce/route.js";
import { Paginated } from "../pagination.js";
import { ListRequest, ListRequest$outboundSchema, paginatedSchema } from "./helpers.js";

export type ListCmsRoutesRequest = ListRequest;
export type ListCmsRoutesResponse = Paginated<Route>;
export const ListCmsRoutesRequest$outboundSchema: z.ZodType<ListCmsRoutesRequest> = ListRequest$outboundSchema;
export const ListCmsRoutesResponse$inboundSchema = paginatedSchema("routes", Route$inboundSchema);
export type GetCmsRouteRequest = { id: number };
export type GetCmsRouteResponse = Route;
export const GetCmsRouteRequest$outboundSchema: z.ZodType<GetCmsRouteRequest> = z.object({ id: z.number().int() });
export const GetCmsRouteResponse$inboundSchema = Route$inboundSchema;
