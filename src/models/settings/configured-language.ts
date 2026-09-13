import * as z from "zod/v4";

export type ConfiguredLanguage = {
  resource: "language";
  code: string;
  name: string;
  native: string;
  isDefault: boolean;
  isEnabled: boolean;
};

/** @internal */
export const ConfiguredLanguage$inboundSchema: z.ZodType<ConfiguredLanguage> = z.object({
  resource: z.literal("language"),
  code: z.string(),
  name: z.string(),
  native: z.string(),
  isDefault: z.boolean(),
  isEnabled: z.boolean(),
});
