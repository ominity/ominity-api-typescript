import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { encodeSimpleQuery } from "../../lib/encodings.js";
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
 * Create social provider redirect link.
 */
export async function socialProvidersCreateLink(
    client: ClientSDK,
    request: operations.CreateSocialProviderLinkRequest,
    options?: RequestOptions,
): Promise<
    Result<
        operations.CreateSocialProviderLinkResponse,
        | OminityError
        | SDKValidationError
        | UnexpectedClientError
        | InvalidRequestError
        | RequestAbortedError
        | RequestTimeoutError
        | ConnectionError
    >
> {
    const input: operations.CreateSocialProviderLinkRequest = request;

    const securitySettings = client._options.security;
    const securityInput = await extractSecurity(securitySettings);
    const security = resolveGlobalSecurity(securityInput);

    const simpleQuery = encodeSimpleQuery({
        "redirectUrl": input.redirectUrl,
    });

    const finalQuery = new URLSearchParams(simpleQuery || "");

    const context = {
        operationID: "createSocialProviderRedirectLink",
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
            method: "GET",
            path: pathToFunc("/settings/socialproviders/{id}/link")(input),
            headers: new Headers(options?.headers),
            query: finalQuery.toString(),
            body: null,
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
        operations.CreateSocialProviderLinkResponse,
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
            operations.CreateSocialProviderLinkResponse$inboundSchema,
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
