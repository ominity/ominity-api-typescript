import * as z from "zod/v4";
import { Product, Product$inboundSchema } from "../commerce/product.js";
import { Subscription, Subscription$inboundSchema } from "../commerce/subscription.js";
import { SubscriptionChange, SubscriptionChange$inboundSchema, SubscriptionTransition, SubscriptionTransition$inboundSchema } from "../commerce/subscription-change.js";
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

/** @deprecated Use `ListCustomerSubscriptionTransitionsRequest` (`GET .../transitions`). */
export type ListCustomerSubscriptionTransitionProductsRequest = ListRequest & { customerId: number; subscriptionId: number };
export type ListCustomerSubscriptionTransitionProductsResponse = Paginated<Product>;
export const ListCustomerSubscriptionTransitionProductsRequest$outboundSchema: z.ZodType<ListCustomerSubscriptionTransitionProductsRequest> = ListRequest$outboundSchema.extend({ customerId: z.number().int(), subscriptionId: z.number().int() });
export const ListCustomerSubscriptionTransitionProductsResponse$inboundSchema = paginatedSchema("products", Product$inboundSchema);

/** @deprecated Use `QuoteCustomerSubscriptionChangeRequest` (`POST .../changes/quote`). */
export type GetCustomerSubscriptionTransitionProductRequest = { customerId: number; subscriptionId: number; productId: number; include?: string | undefined };
export type GetCustomerSubscriptionTransitionProductResponse = Product;
export const GetCustomerSubscriptionTransitionProductRequest$outboundSchema: z.ZodType<GetCustomerSubscriptionTransitionProductRequest> = z.object({ customerId: z.number().int(), subscriptionId: z.number().int(), productId: z.number().int(), include: z.string().optional() });
export const GetCustomerSubscriptionTransitionProductResponse$inboundSchema = Product$inboundSchema;

export type ListCustomerSubscriptionTransitionsRequest = { customerId: number; subscriptionId: number };
export type ListCustomerSubscriptionTransitionsResponse = { count: number; items: SubscriptionTransition[] };
export const ListCustomerSubscriptionTransitionsRequest$outboundSchema: z.ZodType<ListCustomerSubscriptionTransitionsRequest> = z.object({ customerId: z.number().int(), subscriptionId: z.number().int() });
export const ListCustomerSubscriptionTransitionsResponse$inboundSchema: z.ZodType<ListCustomerSubscriptionTransitionsResponse> = z.object({
  count: z.number().int(),
  _embedded: z.object({ transitions: z.array(SubscriptionTransition$inboundSchema) }),
}).transform((value) => ({ count: value.count, items: value._embedded.transitions }));

export type QuoteCustomerSubscriptionChangeRequest = { customerId: number; subscriptionId: number; data: { toOfferId: number; timing?: "immediate" | "period_end" | undefined } };
export type QuoteCustomerSubscriptionChangeResponse = SubscriptionChange;
export const QuoteCustomerSubscriptionChangeRequest$outboundSchema: z.ZodType<QuoteCustomerSubscriptionChangeRequest> = z.object({ customerId: z.number().int(), subscriptionId: z.number().int(), data: z.object({ toOfferId: z.number().int(), timing: z.enum(["immediate", "period_end"]).optional() }) });
export const QuoteCustomerSubscriptionChangeResponse$inboundSchema = SubscriptionChange$inboundSchema;

export type ConfirmCustomerSubscriptionChangeRequest = { customerId: number; subscriptionId: number; data: { quoteId: string } };
export type ConfirmCustomerSubscriptionChangeResponse = SubscriptionChange;
export const ConfirmCustomerSubscriptionChangeRequest$outboundSchema: z.ZodType<ConfirmCustomerSubscriptionChangeRequest> = z.object({ customerId: z.number().int(), subscriptionId: z.number().int(), data: z.object({ quoteId: z.string() }) });
export const ConfirmCustomerSubscriptionChangeResponse$inboundSchema = SubscriptionChange$inboundSchema;

export type CancelCustomerSubscriptionChangeRequest = { customerId: number; subscriptionId: number; changeId: string };
export type CancelCustomerSubscriptionChangeResponse = void;
export const CancelCustomerSubscriptionChangeRequest$outboundSchema: z.ZodType<CancelCustomerSubscriptionChangeRequest> = z.object({ customerId: z.number().int(), subscriptionId: z.number().int(), changeId: z.string() });
export const CancelCustomerSubscriptionChangeResponse$inboundSchema: z.ZodType<void> = z.void();

/** Without `quoteId` the cancellation is quoted; with the `id` of that quote it is confirmed. */
export type CancelCustomerSubscriptionRequest = { customerId: number; subscriptionId: number; data?: { quoteId?: string | undefined; timing?: "immediate" | "period_end" | undefined } | undefined };
export type CancelCustomerSubscriptionResponse = SubscriptionChange;
export const CancelCustomerSubscriptionRequest$outboundSchema: z.ZodType<CancelCustomerSubscriptionRequest> = z.object({ customerId: z.number().int(), subscriptionId: z.number().int(), data: z.object({ quoteId: z.string().optional(), timing: z.enum(["immediate", "period_end"]).optional() }).optional() });
export const CancelCustomerSubscriptionResponse$inboundSchema = SubscriptionChange$inboundSchema;

export type RevokeCustomerSubscriptionCancellationRequest = { customerId: number; subscriptionId: number };
export type RevokeCustomerSubscriptionCancellationResponse = void;
export const RevokeCustomerSubscriptionCancellationRequest$outboundSchema: z.ZodType<RevokeCustomerSubscriptionCancellationRequest> = z.object({ customerId: z.number().int(), subscriptionId: z.number().int() });
export const RevokeCustomerSubscriptionCancellationResponse$inboundSchema: z.ZodType<void> = z.void();
