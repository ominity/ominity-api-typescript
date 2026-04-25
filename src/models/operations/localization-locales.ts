/*
 * Localization locales operations.
 */

import * as z from "zod/v4";
import { Locale, LocalesListResponse } from "../localization/locale.js";

export type LocalizationLocalesListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type ListLocalizationLocalesRequest = LocalizationLocalesListParams;
export type ListLocalizationLocalesResponse = LocalesListResponse;

export type GetLocalizationLocaleRequest = {
  id: number | string;
  include?: string | string[] | undefined;
};
export type GetLocalizationLocaleResponse = Locale;

/** @internal */
export const LocalizationLocalesListParams$outboundSchema: z.ZodType<
  LocalizationLocalesListParams
> = z.object({
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  include: z.union([z.string(), z.array(z.string())]).optional(),
  filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  sort: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const GetLocalizationLocaleRequest$outboundSchema: z.ZodType<
  GetLocalizationLocaleRequest
> = z.object({
  id: z.union([z.string(), z.number()]),
  include: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

