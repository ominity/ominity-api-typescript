import * as z from "zod/v4";
import { CustomerGroup, CustomerGroup$inboundSchema } from "../commerce/customer-group.js";
import { Paginated } from "../pagination.js";
import { ListRequest, ListRequest$outboundSchema, paginatedSchema } from "./helpers.js";

export type ListCustomerGroupsRequest = ListRequest & { customerId: number };
export type ListCustomerGroupsResponse = Paginated<CustomerGroup>;
export const ListCustomerGroupsRequest$outboundSchema: z.ZodType<ListCustomerGroupsRequest> = ListRequest$outboundSchema.extend({ customerId: z.number().int() });
export const ListCustomerGroupsResponse$inboundSchema = paginatedSchema("customer_groups", CustomerGroup$inboundSchema);
export type GetCustomerGroupRequest = { customerId: number; id: number; include?: string | undefined };
export type GetCustomerGroupResponse = CustomerGroup;
export const GetCustomerGroupRequest$outboundSchema: z.ZodType<GetCustomerGroupRequest> = z.object({ customerId: z.number().int(), id: z.number().int(), include: z.string().optional() });
export const GetCustomerGroupResponse$inboundSchema = CustomerGroup$inboundSchema;
