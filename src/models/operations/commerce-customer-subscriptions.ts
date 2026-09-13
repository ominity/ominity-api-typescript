import * as z from "zod/v4";
import { Product, Product$inboundSchema } from "../commerce/product.js";
import { Subscription, Subscription$inboundSchema } from "../commerce/subscription.js";
import { Paginated } from "../pagination.js";
import { ListRequest, ListRequest$outboundSchema, paginatedSchema } from "./helpers.js";

export type ListCustomerSubscriptionsRequest = ListRequest & { customerId: number };
export type ListCustomerSubscriptionsResponse = Paginated<Subscription>;
export const ListCustomerSubscriptionsRequest$outboundSchema: z.ZodType<ListCustomerSubscriptionsRequest> = ListRequest$outboundSchema.extend({ customerId: z.number().int() });
export const ListCustomerSubscriptionsResponse$inboundSchema = paginatedSchema("subscriptions", Subscription$inboundSchema);

export type GetCustomerSubscriptionRequest = { customerId: number; id: number; include?: string | undefined };
export type GetCustomerSubscriptionResponse = Subscription;
export const GetCustomerSubscriptionRequest$outboundSchema: z.ZodType<GetCustomerSubscriptionRequest> = z.object({ customerId: z.number().int(), id: z.number().int(), include: z.string().optional() });
export const GetCustomerSubscriptionResponse$inboundSchema = Subscription$inboundSchema;

export type CreateCustomerSubscriptionRequest = { customerId: number; data: Record<string, unknown> };
export type CreateCustomerSubscriptionResponse = Subscription;
export const CreateCustomerSubscriptionRequest$outboundSchema: z.ZodType<CreateCustomerSubscriptionRequest> = z.object({ customerId: z.number().int(), data: z.record(z.string(), z.unknown()) });
export const CreateCustomerSubscriptionResponse$inboundSchema = Subscription$inboundSchema;

export type UpdateCustomerSubscriptionRequest = { customerId: number; id: number; data: { paused?: boolean | undefined } };
export type UpdateCustomerSubscriptionResponse = Subscription;
export const UpdateCustomerSubscriptionRequest$outboundSchema: z.ZodType<UpdateCustomerSubscriptionRequest> = z.object({ customerId: z.number().int(), id: z.number().int(), data: z.object({ paused: z.boolean().optional() }) });
export const UpdateCustomerSubscriptionResponse$inboundSchema = Subscription$inboundSchema;

export type DeleteCustomerSubscriptionRequest = { customerId: number; id: number };
export type DeleteCustomerSubscriptionResponse = void;
export const DeleteCustomerSubscriptionRequest$outboundSchema: z.ZodType<DeleteCustomerSubscriptionRequest> = z.object({ customerId: z.number().int(), id: z.number().int() });
export const DeleteCustomerSubscriptionResponse$inboundSchema: z.ZodType<void> = z.void();

export type RenewCustomerSubscriptionRequest = { customerId: number; id: number; include?: string | undefined };
export type RenewCustomerSubscriptionResponse = Subscription;
export const RenewCustomerSubscriptionRequest$outboundSchema: z.ZodType<RenewCustomerSubscriptionRequest> = GetCustomerSubscriptionRequest$outboundSchema;
export const RenewCustomerSubscriptionResponse$inboundSchema = Subscription$inboundSchema;

export type ListCustomerSubscriptionTransitionProductsRequest = ListRequest & { customerId: number; subscriptionId: number };
export type ListCustomerSubscriptionTransitionProductsResponse = Paginated<Product>;
export const ListCustomerSubscriptionTransitionProductsRequest$outboundSchema: z.ZodType<ListCustomerSubscriptionTransitionProductsRequest> = ListRequest$outboundSchema.extend({ customerId: z.number().int(), subscriptionId: z.number().int() });
export const ListCustomerSubscriptionTransitionProductsResponse$inboundSchema = paginatedSchema("products", Product$inboundSchema);

export type GetCustomerSubscriptionTransitionProductRequest = { customerId: number; subscriptionId: number; productId: number; include?: string | undefined };
export type GetCustomerSubscriptionTransitionProductResponse = Product;
export const GetCustomerSubscriptionTransitionProductRequest$outboundSchema: z.ZodType<GetCustomerSubscriptionTransitionProductRequest> = z.object({ customerId: z.number().int(), subscriptionId: z.number().int(), productId: z.number().int(), include: z.string().optional() });
export const GetCustomerSubscriptionTransitionProductResponse$inboundSchema = Product$inboundSchema;
