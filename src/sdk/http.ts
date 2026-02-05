/*
 * SDK module: Generic HTTP access
 */

import { HookContext } from "../hooks/types.js";
import { encodeForm } from "../lib/encodings.js";
import { RetryConfig } from "../lib/retries.js";
import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";

export type HttpQuery =
  | string
  | URLSearchParams
  | Record<string, unknown>
  | undefined;

export type HttpRequestOptions = RequestOptions & {
  query?: HttpQuery;
  json?: unknown;
  body?: RequestInit["body"];
  security?: models.Security | (() => Promise<models.Security>) | undefined;
  errorCodes?: Array<number | string>;
};

function isBodyInit(value: unknown): value is RequestInit["body"] {
  return value === null
    || typeof value === "string"
    || value instanceof ArrayBuffer
    || value instanceof Uint8Array
    || value instanceof Blob
    || value instanceof FormData
    || value instanceof URLSearchParams
    || value instanceof ReadableStream;
}

function buildQuery(query: HttpQuery): string | undefined {
  if (!query) return;
  if (typeof query === "string") return query;
  if (query instanceof URLSearchParams) return query.toString();

  const parts: string[] = [];
  for (const [key, value] of Object.entries(query)) {
    const encoded = encodeForm(key, value, { charEncoding: "percent" });
    if (typeof encoded !== "undefined" && encoded !== "") {
      parts.push(encoded);
    }
  }

  return parts.join("&");
}

function resolveRetryConfig(
  options?: RequestOptions,
  fallback?: RetryConfig,
): RetryConfig {
  return options?.retries ?? fallback ?? { strategy: "none" };
}

export class Http extends ClientSDK {
  async request(
    method: string,
    path: string,
    options?: HttpRequestOptions,
  ): Promise<Response> {
    const {
      query,
      json,
      security,
      errorCodes,
      serverURL,
      retries,
      retryCodes,
      headers,
      body,
      fetchOptions,
      timeoutMs,
      ...rest
    } = options ?? {};

    const resolvedQuery = buildQuery(query);
    const resolvedSecuritySource = security ?? this._options.security;
    const resolvedSecurity = resolveGlobalSecurity(
      await extractSecurity(resolvedSecuritySource),
    );

    const resolvedHeaders = new Headers(headers ?? fetchOptions?.headers);
    let resolvedBody: RequestInit["body"] | undefined;

    if (typeof json !== "undefined") {
      resolvedBody = JSON.stringify(json);
      if (!resolvedHeaders.has("content-type")) {
        resolvedHeaders.set("Content-Type", "application/json");
      }
    } else if (typeof body !== "undefined") {
      if (isBodyInit(body)) {
        resolvedBody = body;
      } else {
        resolvedBody = JSON.stringify(body);
        if (!resolvedHeaders.has("content-type")) {
          resolvedHeaders.set("Content-Type", "application/json");
        }
      }
    }

    const retryConfig = resolveRetryConfig(options, this._options.retryConfig);
    const finalRetryCodes = retryCodes ?? ["429", "5XX"];
    const finalErrorCodes = errorCodes ?? ["4XX", "5XX"];

    const baseURL = serverURL ?? this._baseURL ?? undefined;
    const context: HookContext = {
      baseURL: baseURL ?? "",
      operationID: "http.request",
      oAuth2Scopes: null,
      securitySource: resolvedSecuritySource,
      retryConfig,
      resolvedSecurity,
      options: this._options,
    };

    const requestConfig: {
      method: string;
      path: string;
      baseURL?: string | URL | undefined;
      query?: string;
      body?: RequestInit["body"];
      security?: ReturnType<typeof resolveGlobalSecurity>;
      uaHeader?: string;
      userAgent?: string | undefined;
      timeoutMs?: number;
    } = {
      method: method.toUpperCase(),
      path,
      security: resolvedSecurity,
      uaHeader: "user-agent",
    };

    if (baseURL) requestConfig.baseURL = baseURL;
    if (resolvedQuery) requestConfig.query = resolvedQuery;
    if (typeof resolvedBody !== "undefined") requestConfig.body = resolvedBody;
    if (typeof this._options.userAgent !== "undefined") {
      requestConfig.userAgent = this._options.userAgent;
    }
    const effectiveTimeout = timeoutMs ?? this._options.timeoutMs;
    if (typeof effectiveTimeout !== "undefined") {
      requestConfig.timeoutMs = effectiveTimeout;
    }

    const requestOptions: RequestOptions = {
      ...rest,
      headers: resolvedHeaders,
    };
    if (fetchOptions) requestOptions.fetchOptions = fetchOptions;
    if (typeof retries !== "undefined") requestOptions.retries = retries;
    if (typeof finalRetryCodes !== "undefined") {
      requestOptions.retryCodes = finalRetryCodes;
    }
    if (typeof timeoutMs !== "undefined") requestOptions.timeoutMs = timeoutMs;
    if (typeof serverURL !== "undefined") requestOptions.serverURL = serverURL;

    const req = this._createRequest(
      context,
      requestConfig,
      requestOptions,
    );

    if (!req.ok) {
      throw req.error;
    }

    const response = await this._do(req.value, {
      context,
      errorCodes: finalErrorCodes,
      retryConfig,
      retryCodes: finalRetryCodes,
    });

    if (!response.ok) {
      throw response.error;
    }

    return response.value;
  }

  get(path: string, options?: HttpRequestOptions): Promise<Response> {
    return this.request("GET", path, options);
  }

  post(path: string, options?: HttpRequestOptions): Promise<Response> {
    return this.request("POST", path, options);
  }

  put(path: string, options?: HttpRequestOptions): Promise<Response> {
    return this.request("PUT", path, options);
  }

  patch(path: string, options?: HttpRequestOptions): Promise<Response> {
    return this.request("PATCH", path, options);
  }

  delete(path: string, options?: HttpRequestOptions): Promise<Response> {
    return this.request("DELETE", path, options);
  }
}
