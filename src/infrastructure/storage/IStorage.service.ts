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

export interface IStorageService<T> {
  get getClient(): T;
  get bucketName(): string;

  upload(file: StorageFile, bucketName: string): Promise<StoredFile>;
  delete(file: string, bucketName: string): Promise<void>;
}

export const STORAGE_CLIENT_SERVICE = Symbol('IStorageClientService');

export interface IStorageClientService {
  upload(file: StorageFile, bucketName?: string): Promise<StoredFile>;
  delete(file: string, bucketName?: string): Promise<void>;
}
