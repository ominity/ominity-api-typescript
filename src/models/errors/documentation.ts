/*
 * SDK error documentation link model.
 */

import * as z from "zod/v4";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "./sdk-validation-error.js";

/**
 * The URL to the API error handling guide.
 */
export type Documentation = {
  href: string;
  type: string;
};

/** @internal */
export const Documentation$inboundSchema: z.ZodType<Documentation, unknown> = z
  .object({
    href: z.string(),
    type: z.string(),
  });
/** @internal */
export type Documentation$Outbound = {
  href: string;
  type: string;
};

/** @internal */
export const Documentation$outboundSchema: z.ZodType<
  Documentation$Outbound,
  Documentation
> = z.object({
  href: z.string(),
  type: z.string(),
});

export function documentationToJSON(documentation: Documentation): string {
  return JSON.stringify(Documentation$outboundSchema.parse(documentation));
}
export function documentationFromJSON(
  jsonString: string,
): SafeParseResult<Documentation, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Documentation$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Documentation' from JSON`,
  );
}
