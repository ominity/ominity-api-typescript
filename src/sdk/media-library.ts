import {
  mediaLibraryDownload,
  mediaLibraryFoldersCreate,
  mediaLibraryFoldersList,
  mediaLibraryItemsDelete,
  mediaLibraryItemsMove,
  mediaLibraryItemsRename,
  mediaLibraryList,
  mediaLibrarySearch,
  mediaLibrarySource,
  mediaLibraryUploadsPresign,
} from "../funcs/mediaLibrary.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class MediaLibrary extends ClientSDK {
  async list(request: operations.ListMediaRequest = {}, options?: RequestOptions): Promise<operations.ListMediaResponse> { return unwrapAsync(mediaLibraryList(this, request, options)); }
  async listFolders(request: operations.ListMediaFoldersRequest = {}, options?: RequestOptions): Promise<operations.ListMediaFoldersResponse> { return unwrapAsync(mediaLibraryFoldersList(this, request, options)); }
  async createFolder(request: operations.CreateMediaFolderRequest, options?: RequestOptions): Promise<operations.CreateMediaFolderResponse> { return unwrapAsync(mediaLibraryFoldersCreate(this, request, options)); }
  async presignUpload(request: operations.PresignMediaUploadRequest, options?: RequestOptions): Promise<operations.PresignMediaUploadResponse> { return unwrapAsync(mediaLibraryUploadsPresign(this, request, options)); }
  async deleteItem(request: operations.DeleteMediaItemRequest, options?: RequestOptions): Promise<void> { return unwrapAsync(mediaLibraryItemsDelete(this, request, options)); }
  async moveItem(request: operations.MoveMediaItemRequest, options?: RequestOptions): Promise<void> { return unwrapAsync(mediaLibraryItemsMove(this, request, options)); }
  async renameItem(request: operations.RenameMediaItemRequest, options?: RequestOptions): Promise<operations.RenameMediaItemResponse> { return unwrapAsync(mediaLibraryItemsRename(this, request, options)); }
  async search(request: operations.SearchMediaRequest, options?: RequestOptions): Promise<operations.SearchMediaResponse> { return unwrapAsync(mediaLibrarySearch(this, request, options)); }
  async source(request: operations.GetMediaSourceRequest, options?: RequestOptions): Promise<Uint8Array> { return unwrapAsync(mediaLibrarySource(this, request, options)); }
  async download(request: operations.DownloadMediaRequest, options?: RequestOptions): Promise<Uint8Array> { return unwrapAsync(mediaLibraryDownload(this, request, options)); }
}
