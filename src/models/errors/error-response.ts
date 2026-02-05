/*
 * SDK error response model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import * as types from "../../types/primitives.js";
import { OminityError } from "./ominity-error.js";
import {
  ErrorResponseLinks,
  ErrorResponseLinks$inboundSchema,
  ErrorResponseLinks$Outbound,
} from "./error-response-links.js";

/**
 * An error response object.
 */
export type ErrorResponseData = {
  /**
   * The status code of the error message. This is always the same code as the
   * status code of the HTTP message itself.
   */
  status: number;
  /**
   * The HTTP reason phrase of the error.
   */
  title: string;
  /**
   * A detailed human-readable description of the error that occurred.
   */
  detail: string;
  /**
   * Optional validation errors keyed by field name.
   */
  fields?: Record<string, string[]> | undefined;
  links: ErrorResponseLinks;
};

/**
 * An error response object.
 */
export class ErrorResponse extends OminityError {
  status: number;
  title: string;
  detail: string;
  fields?: Record<string, string[]> | undefined;
  links: ErrorResponseLinks;

  /** The original data that was passed to this error instance. */
  data$: ErrorResponseData;

  constructor(
    err: ErrorResponseData,
    httpMeta: { response: Response; request: Request; body: string },
  ) {
    const message = "message" in err && typeof err.message === "string"
      ? err.message
      : `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.status = err.status;
    this.title = err.title;
    this.detail = err.detail;
    if (err.fields != null) this.fields = err.fields;
    this.links = err.links;

    this.name = "ErrorResponse";
  }
}

const ErrorResponseFieldsSchema = z.record(z.string(), z.array(z.string()));

/** @internal */
export const ErrorResponse$inboundSchema: z.ZodType<
  ErrorResponse,
  unknown
> = z.object({
  status: types.number(),
  title: types.string(),
  detail: types.string(),
  fields: z.optional(ErrorResponseFieldsSchema),
  _links: z.lazy(() => ErrorResponseLinks$inboundSchema),
  request$: z.custom<Request>(x => x instanceof Request),
  response$: z.custom<Response>(x => x instanceof Response),
  body$: z.string(),
}).transform((v) => {
  const remapped = remap$(v, {
    "_links": "links",
  });

  return new ErrorResponse(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$,
  });
});

/** @internal */
export type ErrorResponse$Outbound = {
  status: number;
  title: string;
  detail: string;
  fields?: Record<string, string[]> | undefined;
  _links: ErrorResponseLinks$Outbound;
};

/** @internal */
export const ErrorResponse$outboundSchema: z.ZodType<
  ErrorResponse$Outbound,
  ErrorResponse
> = z.custom<ErrorResponse>(v => v instanceof ErrorResponse)
  .transform((v): ErrorResponse$Outbound => {
    const data = v.data$;
    return {
      status: data.status,
      title: data.title,
      detail: data.detail,
      fields: data.fields,
      _links: data.links,
    };
  });