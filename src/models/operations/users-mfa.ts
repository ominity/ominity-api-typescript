/*
 * User MFA operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { UserMfaMethod, UserMfaMethod$inboundSchema } from "../identity/user-mfa-method.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListUserMfaMethodsRequest = {
    /**
     * User ID.
     */
    id: number;
};

export type ListUserMfaMethodsResponse = Paginated<UserMfaMethod>;

/** @internal */
export const ListUserMfaMethodsRequest$outboundSchema: z.ZodType<
    ListUserMfaMethodsRequest
> = z.object({
    id: z.number(),
});

/** @internal */
export const ListUserMfaMethodsResponse$inboundSchema: z.ZodType<
    ListUserMfaMethodsResponse
> = z.object({
    _embedded: z.object({
        user_mfa_methods: z.array(UserMfaMethod$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.user_mfa_methods,
        v.count,
        v._links,
    )
);

export type EnableMfaRequest = {
    /**
     * User ID.
     */
    id: number;
    /**
     * MFA Method.
     */
    method: string;
};

export type EnableMfaResponse = UserMfaMethod;

/** @internal */
export const EnableMfaRequest$outboundSchema: z.ZodType<
    EnableMfaRequest
> = z.object({
    id: z.number(),
    method: z.string(),
});

/** @internal */
export const EnableMfaResponse$inboundSchema: z.ZodType<
    EnableMfaResponse
> = UserMfaMethod$inboundSchema;

export type GetMfaMethodRequest = {
    /**
     * User ID.
     */
    id: number;
    /**
     * MFA Method.
     */
    method: string;
};

export type GetMfaMethodResponse = UserMfaMethod;

/** @internal */
export const GetMfaMethodRequest$outboundSchema: z.ZodType<
    GetMfaMethodRequest
> = z.object({
    id: z.number(),
    method: z.string(),
});

/** @internal */
export const GetMfaMethodResponse$inboundSchema: z.ZodType<
    GetMfaMethodResponse
> = UserMfaMethod$inboundSchema;

export type DisableMfaRequest = {
    /**
     * User ID.
     */
    id: number;
    /**
     * MFA Method.
     */
    method: string;
};

export type DisableMfaResponse = {
    success: boolean;
    message?: string | undefined;
};

/** @internal */
export const DisableMfaRequest$outboundSchema: z.ZodType<
    DisableMfaRequest
> = z.object({
    id: z.number(),
    method: z.string(),
});

/** @internal */
export const DisableMfaResponse$inboundSchema: z.ZodType<
    DisableMfaResponse
> = z.object({
    success: z.boolean(),
    message: z.string().optional(),
}).loose();

export type ValidateMfaRequest = {
    /**
     * User ID.
     */
    id: number;
    /**
     * MFA Method.
     */
    method: string;
    /**
     * MFA Code.
     */
    code: string;
};

export type ValidateMfaResponse = {
    success: boolean;
    message?: string | undefined;
};

/** @internal */
export const ValidateMfaRequest$outboundSchema: z.ZodType<
    ValidateMfaRequest
> = z.object({
    id: z.number(),
    method: z.string(),
    code: z.string(),
});

/** @internal */
export const ValidateMfaResponse$inboundSchema: z.ZodType<
    ValidateMfaResponse
> = z.object({
    success: z.boolean(),
    message: z.string().optional(),
}).loose();

export type SendMfaRequest = {
    /**
     * User ID.
     */
    id: number;
    /**
     * MFA Method.
     */
    method: string;
};

export type SendMfaResponse = {
    success: boolean;
    message?: string | undefined;
};

/** @internal */
export const SendMfaRequest$outboundSchema: z.ZodType<
    SendMfaRequest
> = z.object({
    id: z.number(),
    method: z.string(),
});

/** @internal */
export const SendMfaResponse$inboundSchema: z.ZodType<
    SendMfaResponse
> = z.object({
    success: z.boolean(),
    message: z.string().optional(),
}).loose();
