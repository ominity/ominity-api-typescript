import * as z from "zod/v4";
import {
  MediaFolder,
  MediaFolder$inboundSchema,
  MediaItem,
  MediaItem$inboundSchema,
  MediaList,
  MediaList$inboundSchema,
  PresignedMediaUpload,
  PresignedMediaUpload$inboundSchema,
} from "../media-library.js";

export type MediaItemReference = { path: string; type: "file" | "folder" };
export const MediaItemReference$outboundSchema = z.object({ path: z.string(), type: z.enum(["file", "folder"]) });

export type ListMediaRequest = { path?: string | null | undefined };
export type ListMediaResponse = MediaList;
export const ListMediaRequest$outboundSchema: z.ZodType<ListMediaRequest> = z.object({ path: z.string().nullable().optional() });
export const ListMediaResponse$inboundSchema = MediaList$inboundSchema;

export type ListMediaFoldersRequest = ListMediaRequest;
export type ListMediaFoldersResponse = Array<MediaFolder>;
export const ListMediaFoldersRequest$outboundSchema: z.ZodType<ListMediaFoldersRequest> = ListMediaRequest$outboundSchema;
export const ListMediaFoldersResponse$inboundSchema: z.ZodType<ListMediaFoldersResponse> = z.array(MediaFolder$inboundSchema);

export type CreateMediaFolderRequest = { data: { name: string; parent?: string | null | undefined } };
export type CreateMediaFolderResponse = MediaFolder;
export const CreateMediaFolderRequest$outboundSchema: z.ZodType<CreateMediaFolderRequest> = z.object({ data: z.object({ name: z.string().max(255), parent: z.string().nullable().optional() }) });
export const CreateMediaFolderResponse$inboundSchema = MediaFolder$inboundSchema;

export type PresignMediaUploadRequest = { data: { filename: string; path?: string | null | undefined; mimeType: string; size: number; conflictStrategy?: "copy" | "override" | null | undefined; metadata?: Record<string, string | null> | null | undefined } };
export type PresignMediaUploadResponse = PresignedMediaUpload;
export const PresignMediaUploadRequest$outboundSchema: z.ZodType<PresignMediaUploadRequest> = z.object({ data: z.object({ filename: z.string().max(255), path: z.string().nullable().optional(), mimeType: z.string().max(255), size: z.number().int().positive(), conflictStrategy: z.enum(["copy", "override"]).nullable().optional(), metadata: z.record(z.string(), z.string().nullable()).nullable().optional() }) });
export const PresignMediaUploadResponse$inboundSchema = PresignedMediaUpload$inboundSchema;

export type DeleteMediaItemRequest = { data: MediaItemReference };
export type DeleteMediaItemResponse = void;
export const DeleteMediaItemRequest$outboundSchema: z.ZodType<DeleteMediaItemRequest> = z.object({ data: MediaItemReference$outboundSchema });
export const DeleteMediaItemResponse$inboundSchema: z.ZodType<void> = z.void();

export type MoveMediaItemRequest = { data: MediaItemReference & { targetPath: string } };
export type MoveMediaItemResponse = void;
export const MoveMediaItemRequest$outboundSchema: z.ZodType<MoveMediaItemRequest> = z.object({ data: MediaItemReference$outboundSchema.extend({ targetPath: z.string() }) });
export const MoveMediaItemResponse$inboundSchema: z.ZodType<void> = z.void();

export type RenameMediaItemRequest = { data: MediaItemReference & { newName: string } };
export type RenameMediaItemResponse = { path: string };
export const RenameMediaItemRequest$outboundSchema: z.ZodType<RenameMediaItemRequest> = z.object({ data: MediaItemReference$outboundSchema.extend({ newName: z.string().max(255) }) });
export const RenameMediaItemResponse$inboundSchema: z.ZodType<RenameMediaItemResponse> = z.object({ path: z.string() });

export type SearchMediaRequest = { q: string; path?: string | null | undefined };
export type SearchMediaResponse = Array<MediaItem>;
export const SearchMediaRequest$outboundSchema: z.ZodType<SearchMediaRequest> = z.object({ q: z.string().max(255), path: z.string().nullable().optional() });
export const SearchMediaResponse$inboundSchema: z.ZodType<SearchMediaResponse> = z.array(MediaItem$inboundSchema);

export type GetMediaSourceRequest = { path: string };
export type GetMediaSourceResponse = Uint8Array;
export const GetMediaSourceRequest$outboundSchema: z.ZodType<GetMediaSourceRequest> = z.object({ path: z.string() });
export const GetMediaSourceResponse$inboundSchema: z.ZodType<Uint8Array> = z.instanceof(Uint8Array);

export type DownloadMediaRequest = { data: { items: Array<MediaItemReference>; archive?: boolean | null | undefined } };
export type DownloadMediaResponse = Uint8Array;
export const DownloadMediaRequest$outboundSchema: z.ZodType<DownloadMediaRequest> = z.object({ data: z.object({ items: z.array(MediaItemReference$outboundSchema).min(1), archive: z.boolean().nullable().optional() }) });
export const DownloadMediaResponse$inboundSchema: z.ZodType<Uint8Array> = z.instanceof(Uint8Array);
