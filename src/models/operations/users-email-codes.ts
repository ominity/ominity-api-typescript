/*
 * User email code operations (email-first signup and passwordless sign-in).
 */

import * as z from "zod/v4";

export type SendEmailCodeRequest = {
  email: string;
  /**
   * Where the email's button links to; it must be on one of the channel's domains. The email and code are added as a
   * URL fragment.
   */
  redirectUrl?: string | null | undefined;
  /** Language of the email (and of a new user). */
  language?: string | null | undefined;
  /** The visitor's IP address, for rate limiting. */
  ipAddress?: string | null | undefined;
  /** The visitor's user agent. */
  userAgent?: string | null | undefined;
};

export type SendEmailCodeResponse = {
  /** When the code stops working. */
  expiresAt: string;
  /** When a new code can be requested. */
  resendAvailableAt: string;
};

/** @internal */
export const SendEmailCodeRequest$outboundSchema: z.ZodType<SendEmailCodeRequest> = z.object({
  email: z.string(),
  redirectUrl: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
});

/** @internal */
export const SendEmailCodeResponse$inboundSchema: z.ZodType<SendEmailCodeResponse> = z.object({
  expiresAt: z.string(),
  resendAvailableAt: z.string(),
}).loose();
