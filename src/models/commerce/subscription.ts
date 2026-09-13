import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { CurrencyAmount, CurrencyAmount$inboundSchema } from "../common/amount.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Product, Product$inboundSchema } from "./product.js";
import { SubscriptionInterval, SubscriptionInterval$inboundSchema } from "./subscription-interval.js";

export type SubscriptionPeriod = {
  startedAt: string;
  endsAt: string;
  daysLeft: number;
};

export type Subscription = {
  resource: "subscription";
  id: number;
  customerId: number;
  productId: number;
  intervalId: number;
  status: string;
  firstAmount: CurrencyAmount;
  recurringAmount: CurrencyAmount;
  currentPeriod: SubscriptionPeriod;
  isPausable: boolean;
  expiresAt: string | null;
  dueAt: string | null;
  updatedAt: string;
  createdAt: string;
  product?: Product;
  interval?: SubscriptionInterval;
  links?: HalLinks;
};

/** @internal */
export const SubscriptionPeriod$inboundSchema: z.ZodType<SubscriptionPeriod> = z.object({
  startedAt: z.string(),
  endsAt: z.string(),
  daysLeft: z.number(),
});

/** @internal */
export const Subscription$inboundSchema: z.ZodType<Subscription> = z.object({
  resource: z.literal("subscription"),
  id: z.number().int(),
  customerId: z.number().int(),
  productId: z.number().int(),
  intervalId: z.number().int(),
  status: z.string(),
  firstAmount: CurrencyAmount$inboundSchema,
  recurringAmount: CurrencyAmount$inboundSchema,
  currentPeriod: SubscriptionPeriod$inboundSchema,
  isPausable: z.boolean(),
  expiresAt: z.string().nullable(),
  dueAt: z.string().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _embedded: z.object({
    product: Product$inboundSchema.optional(),
    interval: SubscriptionInterval$inboundSchema.optional(),
  }).optional(),
  _links: HalLinks$inboundSchema.optional(),
}).loose().transform((value) => {
  const subscription = remap$(value, { _links: "links" }) as Subscription;
  if (value._embedded?.product) subscription.product = value._embedded.product;
  if (value._embedded?.interval) subscription.interval = value._embedded.interval;
  return subscription;
});
