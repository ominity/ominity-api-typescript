import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { CurrencyAmount, CurrencyAmount$inboundSchema } from "../common/amount.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Product, Product$inboundSchema } from "./product.js";

/** `change` for a plan change, `cancel` for a cancellation. */
export type SubscriptionChangeType = "change" | "cancel" | (string & {});

export type SubscriptionChangeStatus =
  | "quoted"
  | "pending"
  | "awaiting_payment"
  | "applied"
  | "cancelled"
  | "expired"
  | "failed"
  | (string & {});

export type SubscriptionChangeTiming = "immediate" | "period_end" | (string & {});

/** The plan on one side of a change. */
export type SubscriptionChangePlan = {
  productId: number | null;
  offerId: number | null;
  intervalId: number | null;
  recurringAmount: CurrencyAmount | null;
  quantity: number | null;
};

export type SubscriptionChangeQuoteLine = {
  type: string | null;
  description: string | null;
  amount: CurrencyAmount;
  tax: CurrencyAmount;
  taxRate: number | null;
};

export type SubscriptionChangeQuote = {
  lines: SubscriptionChangeQuoteLine[];
  charge: CurrencyAmount;
  credit: CurrencyAmount;
  settlement: string | null;
};

/** A quoted, scheduled or applied plan change or cancellation. */
export type SubscriptionChange = {
  resource: "subscription_change";
  id: string;
  subscriptionId: number;
  type: SubscriptionChangeType;
  direction: string | null;
  status: SubscriptionChangeStatus;
  timing: SubscriptionChangeTiming | null;
  effectiveAt: string | null;
  from: SubscriptionChangePlan;
  to: SubscriptionChangePlan;
  quote: SubscriptionChangeQuote;
  warnings: string[];
  quoteExpiresAt: string | null;
  /** The order to pay for an immediate upgrade; also linked as `links.checkout`. */
  orderId: number | null;
  createdAt: string | null;
  links?: HalLinks;
};

/** A plan the customer may change the subscription to, quoted at the default timing. */
export type SubscriptionTransition = {
  productId: number;
  offerId: number;
  direction: string | null;
  timing: SubscriptionChangeTiming | null;
  effectiveAt: string | null;
  allowed: boolean;
  reasons: string[];
  charge: CurrencyAmount;
  product: Product;
};

/** @internal */
export const SubscriptionChangePlan$inboundSchema: z.ZodType<SubscriptionChangePlan> = z.object({
  productId: z.number().int().nullable(),
  offerId: z.number().int().nullable(),
  intervalId: z.number().int().nullable(),
  recurringAmount: CurrencyAmount$inboundSchema.nullable(),
  quantity: z.number().int().nullable(),
});

/** @internal */
export const SubscriptionChangeQuoteLine$inboundSchema: z.ZodType<SubscriptionChangeQuoteLine> = z.object({
  type: z.string().nullable(),
  description: z.string().nullable(),
  amount: CurrencyAmount$inboundSchema,
  tax: CurrencyAmount$inboundSchema,
  taxRate: z.number().nullable(),
});

/** @internal */
export const SubscriptionChangeQuote$inboundSchema: z.ZodType<SubscriptionChangeQuote> = z.object({
  lines: z.array(SubscriptionChangeQuoteLine$inboundSchema),
  charge: CurrencyAmount$inboundSchema,
  credit: CurrencyAmount$inboundSchema,
  settlement: z.string().nullable(),
});

/** @internal */
export const SubscriptionChange$inboundSchema: z.ZodType<SubscriptionChange> = z.object({
  resource: z.literal("subscription_change"),
  id: z.string(),
  subscriptionId: z.number().int(),
  type: z.string(),
  direction: z.string().nullable(),
  status: z.string(),
  timing: z.string().nullable(),
  effectiveAt: z.string().nullable(),
  from: SubscriptionChangePlan$inboundSchema,
  to: SubscriptionChangePlan$inboundSchema,
  quote: SubscriptionChangeQuote$inboundSchema,
  warnings: z.array(z.string()),
  quoteExpiresAt: z.string().nullable(),
  orderId: z.number().int().nullable(),
  createdAt: z.string().nullable(),
  _links: HalLinks$inboundSchema.optional(),
}).loose().transform((value) => remap$(value, { _links: "links" }) as SubscriptionChange);

/** @internal */
export const SubscriptionTransition$inboundSchema: z.ZodType<SubscriptionTransition> = z.object({
  productId: z.number().int(),
  offerId: z.number().int(),
  direction: z.string().nullable(),
  timing: z.string().nullable(),
  effectiveAt: z.string().nullable(),
  allowed: z.boolean(),
  reasons: z.array(z.string()),
  charge: CurrencyAmount$inboundSchema,
  product: Product$inboundSchema,
}).loose();
