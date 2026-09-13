import * as z from "zod/v4";

export type TranslationField = { key: string; source?: string | null | undefined; current?: Record<string, string | null> | null | undefined };
export type BulkTranslateRequest = { data: { source_language: string; target_languages: Array<string>; fields: Array<TranslationField>; override?: boolean | undefined; translate_empty_only?: boolean | undefined } };
export type BulkTranslateResponse = { translations: Record<string, Record<string, string | null>>; skipped: Record<string, Record<string, string>> };
export const BulkTranslateRequest$outboundSchema: z.ZodType<BulkTranslateRequest> = z.object({ data: z.object({
  source_language: z.string(), target_languages: z.array(z.string()).min(1), fields: z.array(z.object({ key: z.string(), source: z.string().nullable().optional(), current: z.record(z.string(), z.string().nullable()).nullable().optional() })).min(1), override: z.boolean().optional(), translate_empty_only: z.boolean().optional(),
}) });
export const BulkTranslateResponse$inboundSchema: z.ZodType<BulkTranslateResponse> = z.object({ translations: z.record(z.string(), z.record(z.string(), z.string().nullable())), skipped: z.record(z.string(), z.record(z.string(), z.string())) });
