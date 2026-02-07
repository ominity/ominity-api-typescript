/*
 * Commerce Amount model.
 */

import * as z from "zod/v4";

export type CurrencyAmount = {
  value?: string | undefined;
  amount?: string | undefined;
  currency: string;
};

/** @internal */
export const CurrencyAmount$inboundSchema: z.ZodType<CurrencyAmount> = z.object({
  value: z.string().optional(),
  amount: z.string().optional(),
  currency: z.string(),
});

/** @internal */
export const CurrencyAmount$outboundSchema: z.ZodType<CurrencyAmount> = z.object({
  value: z.string().optional(),
  amount: z.string().optional(),
  currency: z.string(),
});
