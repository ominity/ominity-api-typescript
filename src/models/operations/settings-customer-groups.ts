import * as z from "zod/v4";
import { CustomerGroup, CustomerGroup$inboundSchema } from "../commerce/customer-group.js";
import { Paginated } from "../pagination.js";
import { ListRequest, ListRequest$outboundSchema, paginatedSchema } from "./helpers.js";

export type ListSettingCustomerGroupsRequest = ListRequest;
export type ListSettingCustomerGroupsResponse = Paginated<CustomerGroup>;
export const ListSettingCustomerGroupsRequest$outboundSchema: z.ZodType<ListSettingCustomerGroupsRequest> = ListRequest$outboundSchema;
export const ListSettingCustomerGroupsResponse$inboundSchema = paginatedSchema("customer_groups", CustomerGroup$inboundSchema);
export type GetSettingCustomerGroupRequest = { id: number; include?: string | undefined };
export type GetSettingCustomerGroupResponse = CustomerGroup;
export const GetSettingCustomerGroupRequest$outboundSchema: z.ZodType<GetSettingCustomerGroupRequest> = z.object({ id: z.number().int(), include: z.string().optional() });
export const GetSettingCustomerGroupResponse$inboundSchema = CustomerGroup$inboundSchema;
