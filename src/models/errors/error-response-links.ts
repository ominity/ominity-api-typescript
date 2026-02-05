/*
 * SDK error response links model.
 */

import * as z from "zod/v4";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "./sdk-validation-error.js";
import {
  Documentation,
  Documentation$inboundSchema,
  Documentation$outboundSchema,
  Documentation$Outbound,
} from "./documentation.js";

export type ErrorResponseLinks = {
  /**
   * The URL to the API error handling guide.
   */
  documentation: Documentation;
};

/** @internal */
export const ErrorResponseLinks$inboundSchema: z.ZodType<
  ErrorResponseLinks,
  unknown
> = z.object({
  documentation: z.lazy(() => Documentation$inboundSchema),
});
/** @internal */
export type ErrorResponseLinks$Outbound = {
  documentation: Documentation$Outbound;
};

/** @internal */
export const ErrorResponseLinks$outboundSchema: z.ZodType<
  ErrorResponseLinks$Outbound,
  ErrorResponseLinks
> = z.object({
  documentation: z.lazy(() => Documentation$outboundSchema),
});

export function errorResponseLinksToJSON(
  errorResponseLinks: ErrorResponseLinks,
): string {
  return JSON.stringify(
    ErrorResponseLinks$outboundSchema.parse(errorResponseLinks),
  );
}
export function errorResponseLinksFromJSON(
  jsonString: string,
): SafeParseResult<ErrorResponseLinks, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ErrorResponseLinks$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ErrorResponseLinks' from JSON`,
  );
}
