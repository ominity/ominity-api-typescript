/*
 * Localization languages operations.
 */

import * as z from "zod/v4";
import {
  Language,
  LanguagesListResponse,
} from "../localization/language.js";

export type LocalizationLanguagesListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type ListLocalizationLanguagesRequest = LocalizationLanguagesListParams;
export type ListLocalizationLanguagesResponse = LanguagesListResponse;

export type GetLocalizationLanguageRequest = {
  id: number | string;
  include?: string | string[] | undefined;
};
export type GetLocalizationLanguageResponse = Language;

/** @internal */
export const LocalizationLanguagesListParams$outboundSchema: z.ZodType<
  LocalizationLanguagesListParams
> = z.object({
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  include: z.union([z.string(), z.array(z.string())]).optional(),
  filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  sort: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const GetLocalizationLanguageRequest$outboundSchema: z.ZodType<
  GetLocalizationLanguageRequest
> = z.object({
  id: z.union([z.string(), z.number()]),
  include: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

