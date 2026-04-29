import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as M from "../../lib/matchers.js";
import { extractSecurity, resolveGlobalSecurity } from "../../lib/security.js";
import { pathToFunc } from "../../lib/url.js";
import * as operations from "../../models/operations/index.js";
import { OminityError } from "../../models/errors/ominity-error.js";
import {
    ConnectionError,
    InvalidRequestError,
    RequestAbortedError,
    RequestTimeoutError,
    UnexpectedClientError,
} from "../../models/errors/http-client-errors.js";
import { SDKValidationError } from "../../models/errors/sdk-validation-error.js";
import { Result } from "../../types/fp.js";

/**
 * Update social provider user.
 */
export async function socialProviderUsersUpdate(
    client: ClientSDK,
    request: operations.UpdateSocialProviderUserRequest,
    options?: RequestOptions,
): Promise<
    Result<
        operations.UpdateSocialProviderUserResponse,
        | OminityError
        | SDKValidationError
        | UnexpectedClientError
        | InvalidRequestError
        | RequestAbortedError
        | RequestTimeoutError
        | ConnectionError
    >
> {
    const input: operations.UpdateSocialProviderUserRequest = request;
    const headers = new Headers(options?.headers);
    headers.set("Content-Type", "application/json");

    const securitySettings = client._options.security;
    const securityInput = await extractSecurity(securitySettings);
    const security = resolveGlobalSecurity(securityInput);

    const context = {
        operationID: "updateSocialProviderUser",
        oAuth2Scopes: [],
        securitySource: client._options.security,
        baseURL: client._baseURL,
        retryConfig: options?.retries || client._options.retryConfig || { strategy: "none" },
        resolvedSecurity: security,
        options: options,
    };

    const requestRes = client._createRequest(
        context,
        {
            security: security,
            method: "PATCH",
            path: pathToFunc("/settings/socialproviders/{providerId}/users/{id}")({
                providerId: input.providerId,
                id: input.id,
            }),
            headers,
            query: "",
            body: JSON.stringify({
                userId: input.userId,
            }),
            timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
        },
        options,
    );
    if (!requestRes.ok) {
        return requestRes;
    }
    const req = requestRes.value;

    const doResult = await client._do(req, {
        context,
        errorCodes: ["400", "401", "403", "404", "422", "4XX", "500", "5XX"],
        retryConfig: options?.retries || client._options.retryConfig || { strategy: "none" },
        retryCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
    });
    if (!doResult.ok) {
        return doResult;
    }
    const response = doResult.value;

    const responseFields = {
        HttpMeta: { Response: response, Request: req },
    };

    const [result] = await M.match<
        operations.UpdateSocialProviderUserResponse,
        | OminityError
        | SDKValidationError
        | UnexpectedClientError
        | InvalidRequestError
        | RequestAbortedError
        | RequestTimeoutError
        | ConnectionError
    >(
        M.json(
            200,
            operations.UpdateSocialProviderUserResponse$inboundSchema,
        ),
        M.fail(
            ["400", "401", "403", "404", "422", "4XX", "500", "5XX"],
        ),
    )(response, req, { extraFields: responseFields });
    if (!result.ok) {
        return result;
    }

    return result;
}
