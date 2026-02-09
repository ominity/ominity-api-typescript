/*
 * User Recovery Code operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { UserRecoveryCode, UserRecoveryCode$inboundSchema } from "../identity/user-recovery-code.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListUserRecoveryCodesRequest = {
    /**
     * User ID.
     */
    id: number;
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListUserRecoveryCodesResponse = Paginated<UserRecoveryCode>;

/** @internal */
export const ListUserRecoveryCodesRequest$outboundSchema: z.ZodType<
    ListUserRecoveryCodesRequest
> = z.object({
    id: z.number(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListUserRecoveryCodesResponse$inboundSchema: z.ZodType<
    ListUserRecoveryCodesResponse
> = z.object({
    _embedded: z.object({
        user_recovery_codes: z.array(UserRecoveryCode$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.user_recovery_codes,
        v.count,
        v._links,
    )
);

export type RegenerateRecoveryCodesRequest = {
    /**
     * User ID.
     */
    id: number;
};

export type RegenerateRecoveryCodesResponse = Array<UserRecoveryCode>;

/** @internal */
export const RegenerateRecoveryCodesRequest$outboundSchema: z.ZodType<
    RegenerateRecoveryCodesRequest
> = z.object({
    id: z.number(),
});

/** @internal */
export const RegenerateRecoveryCodesResponse$inboundSchema: z.ZodType<
    RegenerateRecoveryCodesResponse
> = z.array(UserRecoveryCode$inboundSchema);

export type ValidateRecoveryCodeRequest = {
    /**
     * User ID.
     */
    id: number;
    /**
     * Recovery Code.
     */
    code: string;
};

export type ValidateRecoveryCodeResponse = void;

/** @internal */
export const ValidateRecoveryCodeRequest$outboundSchema: z.ZodType<
    ValidateRecoveryCodeRequest
> = z.object({
    id: z.number(),
    code: z.string(),
});

/** @internal */
export const ValidateRecoveryCodeResponse$inboundSchema: z.ZodType<
    ValidateRecoveryCodeResponse
> = z.void();
