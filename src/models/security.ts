import * as z from "zod/v4";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type Security = {
  apiKey?: string | undefined;
  oAuth?: string | undefined;
};

/** @internal */
export const Security$inboundSchema: z.ZodType<Security, unknown> = z
  .object({
    apiKey: z.optional(z.string()),
    oAuth: z.optional(z.string()),
  });
/** @internal */
export type Security$Outbound = {
  apiKey?: string | undefined;
  oAuth?: string | undefined;
};

/** @internal */
export const Security$outboundSchema: z.ZodType<
  Security$Outbound,
  Security
> = z.pipe(
  z.object({
    apiKey: z.optional(z.string()),
    oAuth: z.optional(z.string()),
  }),
  z.transform((v) => v),
);

export function securityToJSON(security: Security): string {
  return JSON.stringify(Security$outboundSchema.parse(security));
}
export function securityFromJSON(
  jsonString: string,
): SafeParseResult<Security, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Security$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Security' from JSON`,
  );
}
