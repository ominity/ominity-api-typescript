import * as z from "zod/v4";
import { remap as remap$ } from "../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "./hal.js";

export type MediaFolder = {
  type: "folder";
  name: string;
  path: string;
  locked: boolean;
  links?: HalLinks;
};

export type MediaItem = {
  type: "file";
  name: string;
  path: string;
  mime_type: string | null;
  size: number | null;
  url: string | null;
  thumbnail_url: string | null;
  meta: Record<string, unknown>;
  links?: HalLinks;
};

export type MediaList = {
  path: string;
  folders: Array<MediaFolder>;
  files: Array<MediaItem>;
  links?: HalLinks;
};

export type PresignedMediaUpload = {
  key: string;
  url: string;
  headers: Record<string, string>;
  publicUrl: string;
  path: string;
  filename: string;
};

/** @internal */
export const MediaFolder$inboundSchema: z.ZodType<MediaFolder> = z.object({
  type: z.literal("folder"),
  name: z.string(),
  path: z.string(),
  locked: z.boolean(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((value) => remap$(value, { _links: "links" }) as MediaFolder);

/** @internal */
export const MediaItem$inboundSchema: z.ZodType<MediaItem> = z.object({
  type: z.literal("file"),
  name: z.string(),
  path: z.string(),
  mime_type: z.string().nullable(),
  size: z.number().int().nullable(),
  url: z.string().nullable(),
  thumbnail_url: z.string().nullable().optional().default(null),
  meta: z.record(z.string(), z.unknown()).optional().default({}),
  _links: HalLinks$inboundSchema.optional(),
}).transform((value) => remap$(value, { _links: "links" }) as MediaItem);

/** @internal */
export const MediaList$inboundSchema: z.ZodType<MediaList> = z.object({
  path: z.string(),
  _embedded: z.object({
    folders: z.array(MediaFolder$inboundSchema),
    files: z.array(MediaItem$inboundSchema),
  }),
  _links: HalLinks$inboundSchema.optional(),
}).transform((value) => ({
  path: value.path,
  folders: value._embedded.folders,
  files: value._embedded.files,
  ...(value._links ? { links: value._links } : {}),
}));

/** @internal */
export const PresignedMediaUpload$inboundSchema: z.ZodType<PresignedMediaUpload> = z.object({
  key: z.string(),
  url: z.string(),
  headers: z.record(z.string(), z.string()),
  publicUrl: z.string(),
  path: z.string(),
  filename: z.string(),
});
