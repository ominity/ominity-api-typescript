/*
 * Get VAT validation function.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import * as M from "../../lib/matchers.js";
import { pathToFunc } from "../../lib/url.js";
import { extractSecurity, resolveGlobalSecurity } from "../../lib/security.js";
import { OminityError } from "../../models/errors/ominity-error.js";
import { ConnectionError, InvalidRequestError, UnexpectedClientError, RequestAbortedError, RequestTimeoutError } from "../../models/errors/http-client-errors.js";
import { Result } from "../../types/fp.js";

export function vatValidationsGet(
    client: ClientSDK,
    request: operations.GetVatValidationRequest,
    options?: RequestOptions,
): Promise<
    Result<
        operations.GetVatValidationResponse,
        | OminityError
        | ConnectionError
        | InvalidRequestError
        | UnexpectedClientError
        | RequestAbortedError
        | RequestTimeoutError
    >
> {
    return $do(client, request, options);
}

async function $do(
    client: ClientSDK,
    request: operations.GetVatValidationRequest,
    options?: RequestOptions,
): Promise<
    Result<
        operations.GetVatValidationResponse,
        | OminityError
        | ConnectionError
        | InvalidRequestError
        | UnexpectedClientError
        | RequestAbortedError
        | RequestTimeoutError
    >
> {
    const path = pathToFunc("/commerce/vat-validations/{number}")({
        number: request.vatNumber,
    });

    const headers = new Headers({
        Accept: "application/hal+json",
    });

    const securityInput = await extractSecurity(client._options.security);
    const security = resolveGlobalSecurity(securityInput);

    const context = {
        operationID: "getVatValidation",
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
            path: path,
            headers: headers,
            body: null,
            timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
        },
        options
    );
    if (!requestRes.ok) {
        return requestRes;
    }
    const req = requestRes.value;

    const doResult = await client._do(req, {
        context,
        errorCodes: ["400", "401", "403", "404", "4XX", "500", "5XX"],
        retryConfig: options?.retries || client._options.retryConfig || { strategy: "none" },
        retryCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
    });
    if (!doResult.ok) {
        return doResult;
    }
    const response = doResult.value;

    const responseFields = {
        ContentType: response.headers.get("content-type") ?? "application/octet-stream",
        StatusCode: response.status,
        RawResponse: response,
        Headers: {},
    };

    const [result] = await M.match<
        operations.GetVatValidationResponse,
        | OminityError
        | ConnectionError
        | InvalidRequestError
        | UnexpectedClientError
        | RequestAbortedError
        | RequestTimeoutError
    >(
        M.json(200, operations.GetVatValidationResponse$inboundSchema),
        M.fail([400, 401, 403, 404, "4XX", 500, "5XX"])
    )(response, req, { extraFields: responseFields });
    if (!result.ok) {
        return result;
    }

    return result;
}

