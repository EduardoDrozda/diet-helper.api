import { GetFileDTO } from '@application/dtos/file/get-file.dto';
import { UploadFileDTO } from '@application/dtos/file/upload-file.dto';
import { CreateFileInput } from '@domain/entities';
import { FILE_REPOSITORY, IFileRepository } from '@domain/repositories';
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
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: IFileRepository,
  ) {}

  async upload(data: UploadFileDTO): Promise<GetFileDTO> {
    const storedFile = await this.storageService.upload(data);

    const payload: CreateFileInput = {
      name: storedFile.name,
      original_name: data.originalname,
      url: storedFile.url,
      size: data.size,
      type: data.mimetype,
    };

    return await this.fileRepository.create(payload);
  }
}
