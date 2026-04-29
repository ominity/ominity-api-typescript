/*
 * User password reset operations.
 */

import * as z from "zod/v4";

export type SendPasswordResetLinkRequest = {
  email: string;
  redirectUrl: string;
  userAgent?: string | null | undefined;
  ipAddress?: string | null | undefined;
};

export type SendPasswordResetLinkResponse = {
  success: boolean;
  message: string;
  expiresAt?: string | undefined;
  createdAt?: string | undefined;
};

/** @internal */
export const SendPasswordResetLinkRequest$outboundSchema: z.ZodType<
  SendPasswordResetLinkRequest
> = z.object({
  email: z.string(),
  redirectUrl: z.string(),
  userAgent: z.string().nullable().optional(),
  ipAddress: z.string().nullable().optional(),
});

/** @internal */
export const SendPasswordResetLinkResponse$inboundSchema: z.ZodType<
  SendPasswordResetLinkResponse
> = z.object({
  success: z.boolean(),
  message: z.string(),
  expiresAt: z.string().optional(),
  createdAt: z.string().optional(),
}).loose();

export type ResetPasswordRequest = {
  email: string;
  token: string;
  password: string;
  userAgent?: string | null | undefined;
  ipAddress?: string | null | undefined;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
  updatedAt?: string | undefined;
};

/** @internal */
export const ResetPasswordRequest$outboundSchema: z.ZodType<ResetPasswordRequest> =
  z.object({
    email: z.string(),
    token: z.string(),
    password: z.string(),
    userAgent: z.string().nullable().optional(),
    ipAddress: z.string().nullable().optional(),
  });

/** @internal */
export const ResetPasswordResponse$inboundSchema: z.ZodType<ResetPasswordResponse> =
  z.object({
    success: z.boolean(),
    message: z.string(),
    updatedAt: z.string().optional(),
  }).loose();
