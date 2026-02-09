import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import {
  CurrencyAmount,
  CurrencyAmount$inboundSchema,
  CurrencyAmount$outboundSchema,
} from "../common/amount.js";
import {
  Address,
  Address$inboundSchema,
  Address$outboundSchema,
} from "./address.js";

export type CartLinks = {
  self: {
    href: string;
    type: string;
  };
  customer?: {
    href: string;
    type: string;
  };
};

/** @internal */
export const CartLinks$inboundSchema: z.ZodType<CartLinks> = z.object({
  self: z.object({
    href: z.string(),
    type: z.string(),
  }),
  customer: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
}) as unknown as z.ZodType<CartLinks>;

/** @internal */
export const CartLinks$outboundSchema: z.ZodType<CartLinks> = z.object({
  self: z.object({
    href: z.string(),
    type: z.string(),
  }),
  customer: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
}) as unknown as z.ZodType<CartLinks>;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CartLinks$ {
  /** @deprecated use `CartLinks$inboundSchema` instead. */
  export const inboundSchema = CartLinks$inboundSchema;
  /** @deprecated use `CartLinks$outboundSchema` instead. */
  export const outboundSchema = CartLinks$outboundSchema;
}

export type Cart = {
  resource: string;
  id: string;
  status: string;
  type: string;
  channelId: number;
  languageId?: string | null;
  customerId?: number | null;
  userId?: number | null;
  email?: string;
  companyName?: string;
  companyVat?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  subtotalAmount: CurrencyAmount;
  shippingAmount: CurrencyAmount;
  discountAmount: CurrencyAmount;
  taxAmount: CurrencyAmount;
  totalAmount: CurrencyAmount;
  country: string;
  currency: string;
  isShippingRequired: boolean;
  shippingMethodId?: string | null;
  isTaxExempt: boolean;
  totalQuantity: number;
  promotionCodes?: Array<string>;
  updatedAt: string;
  createdAt: string;
  links: CartLinks;
};

/** @internal */
export const Cart$inboundSchema: z.ZodType<Cart> = z
  .object({
    resource: z.string(),
    id: z.string(),
    status: z.string(),
    type: z.string(),
    channelId: z.number().int(),
    languageId: z.nullable(z.string()).optional(),
    customerId: z.nullable(z.number().int()).optional(),
    userId: z.nullable(z.number().int()).optional(),
    email: z.string().optional(),
    companyName: z.string().optional(),
    companyVat: z.string().optional(),
    billingAddress: Address$inboundSchema.optional(),
    shippingAddress: Address$outboundSchema.optional(),
    subtotalAmount: CurrencyAmount$inboundSchema,
    shippingAmount: CurrencyAmount$inboundSchema,
    discountAmount: CurrencyAmount$inboundSchema,
    taxAmount: CurrencyAmount$inboundSchema,
    totalAmount: CurrencyAmount$inboundSchema,
    country: z.string(),
    currency: z.string(),
    isShippingRequired: z.boolean(),
    shippingMethodId: z.nullable(z.string()).optional(),
    isTaxExempt: z.boolean(),
    totalQuantity: z.number().int(),
    promotionCodes: z.array(z.string()).optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: CartLinks$inboundSchema,
  })
  .transform((v) => {
    return remap$(v, {
      _links: "links",
    });
  }) as unknown as z.ZodType<Cart>;

/** @internal */
export const Cart$outboundSchema: z.ZodType<Cart> = z
  .object({
    resource: z.string(),
    id: z.string(),
    status: z.string(),
    type: z.string(),
    channelId: z.number().int(),
    languageId: z.nullable(z.string()).optional(),
    customerId: z.nullable(z.number().int()).optional(),
    userId: z.nullable(z.number().int()).optional(),
    email: z.string().optional(),
    companyName: z.string().optional(),
    companyVat: z.string().optional(),
    billingAddress: Address$outboundSchema.optional(),
    shippingAddress: Address$outboundSchema.optional(),
    subtotalAmount: CurrencyAmount$outboundSchema,
    shippingAmount: CurrencyAmount$outboundSchema,
    discountAmount: CurrencyAmount$outboundSchema,
    taxAmount: CurrencyAmount$outboundSchema,
    totalAmount: CurrencyAmount$outboundSchema,
    country: z.string(),
    currency: z.string(),
    isShippingRequired: z.boolean(),
    shippingMethodId: z.nullable(z.string()).optional(),
    isTaxExempt: z.boolean(),
    totalQuantity: z.number().int(),
    promotionCodes: z.array(z.string()).optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
    links: CartLinks$outboundSchema,
  })
  .transform((v) => {
    return remap$(v, {
      links: "_links",
    });
  }) as unknown as z.ZodType<Cart>;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Cart$ {
  /** @deprecated use `Cart$inboundSchema` instead. */
  export const inboundSchema = Cart$inboundSchema;
  /** @deprecated use `Cart$outboundSchema` instead. */
  export const outboundSchema = Cart$outboundSchema;
}
