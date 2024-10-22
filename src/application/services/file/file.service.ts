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

  async upload(userId: string, data: UploadFileDTO): Promise<GetFileDTO> {
    const storedFile = await this.storageService.upload(data);

    const payload: CreateFileInput = {
      name: storedFile.name,
      original_name: data.originalname,
      user_id: userId,
      url: storedFile.url,
      size: data.size,
      type: data.mimetype,
    };

    return await this.fileRepository.create(payload);
  }

  async findByUrl(url: string): Promise<GetFileDTO> {
    return await this.fileRepository.findByUrl(url);
  }

  async update(file: GetFileDTO, data: UploadFileDTO): Promise<GetFileDTO> {
    await this.storageService.delete(file.original_name);
    const storedFile = await this.storageService.upload(data);

    const payload: CreateFileInput = {
      name: storedFile.name,
      original_name: data.originalname,
      url: storedFile.url,
      size: data.size,
      type: data.mimetype,
      user_id: file.user_id,
    };

    const updatedFile = await this.fileRepository.update({
      ...file,
      ...payload,
    });

    return updatedFile;
  }
}
