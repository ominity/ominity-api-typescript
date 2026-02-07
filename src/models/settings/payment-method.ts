import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { CurrencyAmount, CurrencyAmount$inboundSchema, CurrencyAmount$outboundSchema } from "../common/amount.js";

export type PaymentMethodLinks = {
    self: {
        href: string;
        type: string;
    };
};

/** @internal */
export const PaymentMethodLinks$inboundSchema: z.ZodType<PaymentMethodLinks> = z.object({
    self: z.object({
        href: z.string(),
        type: z.string(),
    }),
});

/** @internal */
export const PaymentMethodLinks$outboundSchema: z.ZodType<PaymentMethodLinks> = z.object({
    self: z.object({
        href: z.string(),
        type: z.string(),
    }),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PaymentMethodLinks$ {
    /** @deprecated use `PaymentMethodLinks$inboundSchema` instead. */
    export const inboundSchema = PaymentMethodLinks$inboundSchema;
    /** @deprecated use `PaymentMethodLinks$outboundSchema` instead. */
    export const outboundSchema = PaymentMethodLinks$outboundSchema;
}

export type PaymentMethod = {
    resource: string;
    id: number;
    gateway: string;
    method: string;
    label: string;
    icon: string;
    isEnabled: boolean;
    minimumAmount?: CurrencyAmount | null;
    maximumAmount?: CurrencyAmount | null;
    issuers?: any[];
    features?: Record<string, any>;
    updatedAt: string;
    createdAt: string;
    links: PaymentMethodLinks;
};

/** @internal */
export const PaymentMethod$inboundSchema: z.ZodType<PaymentMethod> = z.object({
    resource: z.string(),
    id: z.number(),
    gateway: z.string(),
    method: z.string(),
    label: z.string(),
    icon: z.string(),
    isEnabled: z.boolean(),
    minimumAmount: z.nullable(CurrencyAmount$inboundSchema).optional(),
    maximumAmount: z.nullable(CurrencyAmount$inboundSchema).optional(),
    issuers: z.array(z.any()).optional(),
    features: z.record(z.string(), z.any()).optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: PaymentMethodLinks$inboundSchema,
}).transform((v) => {
    return remap$(v, {
        _links: "links",
    });
}) as unknown as z.ZodType<PaymentMethod>;

/** @internal */
export const PaymentMethod$outboundSchema: z.ZodType<PaymentMethod> = z.object({
    resource: z.string(),
    id: z.number(),
    gateway: z.string(),
    method: z.string(),
    label: z.string(),
    icon: z.string(),
    isEnabled: z.boolean(),
    minimumAmount: z.nullable(CurrencyAmount$outboundSchema).optional(),
    maximumAmount: z.nullable(CurrencyAmount$outboundSchema).optional(),
    issuers: z.array(z.any()).optional(),
    features: z.record(z.string(), z.any()).optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
    links: PaymentMethodLinks$outboundSchema,
}).transform((v) => {
    return remap$(v, {
        links: "_links",
    });
}) as unknown as z.ZodType<PaymentMethod>;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PaymentMethod$ {
    /** @deprecated use `PaymentMethod$inboundSchema` instead. */
    export const inboundSchema = PaymentMethod$inboundSchema;
    /** @deprecated use `PaymentMethod$outboundSchema` instead. */
    export const outboundSchema = PaymentMethod$outboundSchema;
}
