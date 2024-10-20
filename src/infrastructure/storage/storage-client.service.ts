import { Injectable } from '@nestjs/common';
import {
  IStorageClientService,
  StorageFile,
  StoredFile,
} from './IStorage.service';
import { StorageService } from './storage.service';

@Injectable()
export class StorageClientService implements IStorageClientService {
  constructor(private readonly storageService: StorageService) {}

  async upload(file: StorageFile, bucketName?: string): Promise<StoredFile> {
    return this.storageService.upload(file, bucketName);
  }

  async delete(file: string, bucketName?: string): Promise<void> {
    return this.storageService.delete(file, bucketName);
  }
}
