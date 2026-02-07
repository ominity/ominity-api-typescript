/*
 * Regenerate user recovery codes.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import {
    encodeSimple,
} from "../../lib/encodings.js";
import * as M from "../../lib/matchers.js";
import { safeParse } from "../../lib/schemas.js";
import { extractSecurity, resolveGlobalSecurity } from "../../lib/security.js";
import * as errors from "../../models/errors/index.js";
import { ResponseValidationError } from "../../models/errors/response-validation-error.js";
import { SDKValidationError } from "../../models/errors/sdk-validation-error.js";
import {
    ConnectionError,
    InvalidRequestError,
    RequestAbortedError,
    RequestTimeoutError,
    UnexpectedClientError,
} from "../../models/errors/http-client-errors.js";
import * as operations from "../../models/operations/index.js";
import { RegenerateRecoveryCodesResponse$inboundSchema } from "../../models/operations/users-recovery-codes.js";
import { APICall, APIPromise } from "../../types/async.js";
import { OK, Result } from "../../types/fp.js";

export function usersRegenerateRecoveryCodes(
    client: ClientSDK,
    request: operations.RegenerateRecoveryCodesRequest,
    options?: RequestOptions,
): APIPromise<
    Result<
        operations.RegenerateRecoveryCodesResponse,
        | errors.ErrorResponse
        | errors.OminityDefaultError
        | ResponseValidationError
        | ConnectionError
        | RequestAbortedError
        | RequestTimeoutError
        | InvalidRequestError
        | UnexpectedClientError
        | SDKValidationError
    >
> {
    return new APIPromise($do(
        client,
        request,
        options,
    ));
}

async function $do(
    client: ClientSDK,
    request: operations.RegenerateRecoveryCodesRequest,
    options?: RequestOptions,
): Promise<
    [
        Result<
            operations.RegenerateRecoveryCodesResponse,
            | errors.ErrorResponse
            | errors.OminityDefaultError
            | ResponseValidationError
            | ConnectionError
            | RequestAbortedError
            | RequestTimeoutError
            | InvalidRequestError
            | UnexpectedClientError
            | SDKValidationError
        >,
        APICall,
    ]
> {
    const parsed = safeParse(
        request,
        (value) =>
            operations.RegenerateRecoveryCodesRequest$outboundSchema.parse(value),
        "Input validation failed",
    );
    if (!parsed.ok) {
        return [parsed, { status: "invalid" }];
    }
    const payload = parsed.value;
    const body = null;

    const path = encodeSimple(
        "/users/{id}/recovery-codes",
        { "id": payload.id },
        { explode: false, charEncoding: "percent" },
    ) || "";

    const headers = new Headers({
        Accept: "application/json",
    });

    const securityInput = await extractSecurity(client._options.security);
    const requestSecurity = resolveGlobalSecurity(securityInput);

    const context = {
        options: client._options,
        baseURL: options?.serverURL ?? client._baseURL ?? "",
        operationID: "users.regenerateRecoveryCodes",
        oAuth2Scopes: null,
        resolvedSecurity: requestSecurity,
        securitySource: client._options.security,
        retryConfig: options?.retries
            || client._options.retryConfig
            || {
            strategy: "backoff",
            backoff: {
                initialInterval: 500,
                maxInterval: 5000,
                exponent: 2,
                maxElapsedTime: 7500,
            },
            retryConnectionErrors: true,
        }
            || { strategy: "none" },
        retryCodes: options?.retryCodes || ["5xx"],
    };

    const requestRes = client._createRequest(context, {
        security: requestSecurity,
        method: "POST",
        baseURL: options?.serverURL,
        path,
        headers,
        body,
        userAgent: client._options.userAgent,
        timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
    }, options);
    if (!requestRes.ok) {
        return [requestRes, { status: "invalid" }];
    }
    const req = requestRes.value;

    const doResult = await client._do(req, {
        context,
        errorCodes: ["400", "4XX", "5XX"],
        retryConfig: context.retryConfig,
        retryCodes: context.retryCodes,
    });
    if (!doResult.ok) {
        return [doResult, { status: "request-error", request: req }];
    }
    const response = doResult.value;

    const responseFields = {
        HttpMeta: { Response: response, Request: req },
    };

    const [result] = await M.match<
        operations.RegenerateRecoveryCodesResponse,
        | errors.ErrorResponse
        | errors.OminityDefaultError
        | ResponseValidationError
        | ConnectionError
        | RequestAbortedError
        | RequestTimeoutError
        | InvalidRequestError
        | UnexpectedClientError
        | SDKValidationError
    >(
        M.json(200, RegenerateRecoveryCodesResponse$inboundSchema, {
            ctype: "application/json",
        }),
        M.jsonErr("4XX", errors.ErrorResponse$inboundSchema, {
            ctype: "application/hal+json",
        }),
        M.fail("5XX"),
    )(response, req, { extraFields: responseFields });
    if (!result.ok) {
        return [result, { status: "complete", request: req, response }];
    }

    return [
        OK(result.value),
        { status: "complete", request: req, response },
    ];
}
