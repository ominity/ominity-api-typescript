import type * as z from "zod/v4";
import { encodeDeepObjectQuery, encodeFormQuery, encodeJSON, queryJoin } from "./encodings.js";
import * as M from "./matchers.js";
import { safeParse } from "./schemas.js";
import { extractSecurity, resolveGlobalSecurity } from "./security.js";
import { ClientSDK, RequestOptions } from "./sdks.js";
import * as errors from "../models/errors/index.js";
import { ResponseValidationError } from "../models/errors/response-validation-error.js";
import { SDKValidationError } from "../models/errors/sdk-validation-error.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../models/errors/http-client-errors.js";
import { APICall, APIPromise } from "../types/async.js";
import { OK, Result } from "../types/fp.js";
import { applyPaginationParams, Paginated, PaginationParams } from "../models/pagination.js";

export type OperationError =
  | errors.ErrorResponse
  | errors.OminityDefaultError
  | ResponseValidationError
  | ConnectionError
  | RequestAbortedError
  | RequestTimeoutError
  | InvalidRequestError
  | UnexpectedClientError
  | SDKValidationError;

export type OperationDefinition<Request, Response> = {
  operationID: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  path: (request: Request) => string;
  requestSchema: z.ZodType<Request>;
  responseSchema: z.ZodType<Response>;
  query?: ((request: Request) => string | undefined) | undefined;
  body?: ((request: Request) => unknown) | undefined;
  responseType?: "json" | "bytes" | "stream" | "void" | undefined;
  successStatus?: number | Array<number> | undefined;
};

export function encodeOperationQuery(request: {
  include?: string | undefined;
  sort?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
  filter?: Record<string, unknown> | undefined;
}, extra: Record<string, unknown> = {}): string {
  return queryJoin(
    encodeFormQuery({
      ...extra,
      include: request.include,
      sort: request.sort,
      page: request.page,
      limit: request.limit,
    }),
    request.filter ? encodeDeepObjectQuery({ filter: request.filter }) : undefined,
  );
}

/**
 * Executes a standard Ominity API operation while preserving the same
 * validation, security, retry, error, and inspection lifecycle as generated
 * endpoint functions.
 */
export function executeOperation<Request, Response>(
  client: ClientSDK,
  request: Request,
  definition: OperationDefinition<Request, Response>,
  options?: RequestOptions,
): APIPromise<Result<Response, OperationError>> {
  return new APIPromise(execute(client, request, definition, options));
}

async function execute<Request, Response>(
  client: ClientSDK,
  request: Request,
  definition: OperationDefinition<Request, Response>,
  options?: RequestOptions,
): Promise<[Result<Response, OperationError>, APICall]> {
  const parsed = safeParse(
    request,
    (value) => definition.requestSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }

  const payload = parsed.value;
  const responseType = definition.responseType ?? "json";
  const headers = new Headers({
    Accept: responseType === "json" ? "application/hal+json" : "*/*",
  });
  const bodyValue = definition.body?.(payload);
  const body = typeof bodyValue === "undefined"
    ? null
    : encodeJSON("body", bodyValue, { explode: true });
  if (body !== null) {
    headers.set("Content-Type", "application/json");
  }

  const securityInput = await extractSecurity(client._options.security);
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: definition.operationID,
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.security,
    retryConfig: options?.retries
      || client._options.retryConfig
      || {
        strategy: "backoff" as const,
        backoff: {
          initialInterval: 500,
          maxInterval: 5000,
          exponent: 2,
          maxElapsedTime: 7500,
        },
        retryConnectionErrors: true,
      },
    retryCodes: options?.retryCodes || ["5xx"],
  };

  const query = definition.query?.(payload);
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: definition.method,
    baseURL: options?.serverURL,
    path: definition.path(payload),
    headers,
    ...(typeof query === "undefined" ? {} : { query }),
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

  const status = definition.successStatus ?? (definition.method === "POST" ? [200, 201] : 200);
  let successMatcher: M.ValueMatcher<Response>;
  if (responseType === "bytes") {
    successMatcher = M.bytes(status, definition.responseSchema, { ctype: "*" });
  } else if (responseType === "stream") {
    successMatcher = M.stream(status, definition.responseSchema, { ctype: "*" });
  } else if (responseType === "void") {
    successMatcher = M.nil(status, definition.responseSchema, { ctype: "*" });
  } else {
    successMatcher = M.json(status, definition.responseSchema);
  }

  const [result] = await M.match<Response, OperationError>(
    successMatcher,
    M.jsonErr("4XX", errors.ErrorResponse$inboundSchema),
    M.fail("5XX"),
  )(response, req, {
    extraFields: { HttpMeta: { Response: response, Request: req } },
  });

  if (result.ok && isPaginated(result.value)) {
    return [
      OK(applyPaginationParams(result.value, payload as PaginationParams) as Response),
      { status: "complete", request: req, response },
    ];
  }

  return [result, { status: "complete", request: req, response }];
}

function isPaginated(value: unknown): value is Paginated<unknown> {
  return typeof value === "object"
    && value !== null
    && "items" in value
    && Array.isArray(value.items)
    && "count" in value
    && typeof value.count === "number"
    && "page" in value
    && typeof value.page === "number"
    && "limit" in value
    && typeof value.limit === "number";
}
