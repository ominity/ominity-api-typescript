import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type MandateDetails = {
  holderName?: string | undefined;
  cardNumber?: string | undefined;
  cardType?: string | undefined;
  cardFingerprint?: string | undefined;
  cardExpiry?: string | undefined;
  accountNumber?: string | undefined;
  accountBic?: string | undefined;
};

export type Mandate = {
  resource: "mandate";
  id: number;
  customerId: number;
  paymentmethodId: number;
  firstPaymentId: number;
  imageUrl: string | null;
  status: string;
  details: MandateDetails;
  signedAt: string | null;
  updatedAt: string;
  createdAt: string;
  links?: HalLinks;
};

/** @internal */
export const MandateDetails$inboundSchema: z.ZodType<MandateDetails> = z.object({
  holderName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardType: z.string().optional(),
  cardFingerprint: z.string().optional(),
  cardExpiry: z.string().optional(),
  accountNumber: z.string().optional(),
  accountBic: z.string().optional(),
});

/** @internal */
export const Mandate$inboundSchema: z.ZodType<Mandate> = z.object({
  resource: z.literal("mandate"),
  id: z.number().int(),
  customerId: z.number().int(),
  paymentmethodId: z.number().int(),
  firstPaymentId: z.number().int(),
  imageUrl: z.string().nullable(),
  status: z.string(),
  details: MandateDetails$inboundSchema,
  signedAt: z.string().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
}).loose().transform((value) => remap$(value, { _links: "links" }) as Mandate);
