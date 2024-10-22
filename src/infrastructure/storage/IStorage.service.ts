import { FileMimeType } from '@domain/enums';

export interface StorageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: FileMimeType;
  size: number;
  buffer: Buffer;
}

export interface StoredFile {
  name: string;
  url: string;
}

export interface UploadParams {
  isPublic?: boolean;
  bucketName?: string;
}

export interface IStorageService<T> {
  get client(): T;
  get defaultBucketName(): string;

  upload(file: StorageFile, params?: UploadParams): Promise<StoredFile>;
  makeFilePublic(file: string, params?: UploadParams): Promise<void>;
  getPresignedUrl(file: string, params?: UploadParams): Promise<string>;
  delete(file: string, params?: UploadParams): Promise<void>;
}

export const STORAGE_CLIENT_SERVICE = Symbol('IStorageClientService');

export interface IStorageClientService {
  upload(file: StorageFile, params?: UploadParams): Promise<StoredFile>;
  update(
    file: string,
    data: StorageFile,
    params?: UploadParams,
  ): Promise<StoredFile>;
  delete(file: string, params?: UploadParams): Promise<void>;
}
