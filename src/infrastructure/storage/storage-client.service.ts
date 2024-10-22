import { Injectable } from '@nestjs/common';
import {
  IStorageClientService,
  StorageFile,
  StoredFile,
  UploadParams,
} from './IStorage.service';
import { StorageService } from './storage.service';

@Injectable()
export class StorageClientService implements IStorageClientService {
  constructor(private readonly storageService: StorageService) {}

  async upload(file: StorageFile, params?: UploadParams): Promise<StoredFile> {
    return this.storageService.upload(file, params);
  }

  async update(
    file: string,
    data: StorageFile,
    params?: UploadParams,
  ): Promise<StoredFile> {
    await this.storageService.delete(file, params);
    return this.storageService.upload(data, params);
  }

  async delete(file: string, params?: UploadParams): Promise<void> {
    return this.storageService.delete(file, params);
  }
}
