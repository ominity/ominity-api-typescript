import * as z from "zod/v4";
import { ConfiguredLanguage, ConfiguredLanguage$inboundSchema } from "../settings/configured-language.js";
import { Paginated } from "../pagination.js";
import { paginatedSchema } from "./helpers.js";

export type ListConfiguredLanguagesRequest = { filter?: { enabled?: boolean | undefined } | undefined };
export type ListConfiguredLanguagesResponse = Paginated<ConfiguredLanguage>;
export const ListConfiguredLanguagesRequest$outboundSchema: z.ZodType<ListConfiguredLanguagesRequest> = z.object({ filter: z.object({ enabled: z.boolean().optional() }).optional() });
export const ListConfiguredLanguagesResponse$inboundSchema = paginatedSchema("languages", ConfiguredLanguage$inboundSchema);
