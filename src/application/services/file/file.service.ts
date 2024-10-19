import { UploadFileDTO } from '@application/dtos/file/upload-file.dto';
import { IFileService } from '@domain/services/file';
import {
  IStorageClientService,
  STORAGE_CLIENT_SERVICE,
} from '@infrastructure/storage';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FileService implements IFileService {
  constructor(
    @Inject(STORAGE_CLIENT_SERVICE)
    private readonly storageService: IStorageClientService,
  ) {}

  async upload(data: UploadFileDTO): Promise<any> {
    return await this.storageService.upload(data);
  }
}
