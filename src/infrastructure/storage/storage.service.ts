import { Inject, Injectable, Logger } from '@nestjs/common';
import { IStorageService } from './IStorage.service';
import { MinioService as Client, MinioClient } from 'nestjs-minio-client';
import {
  ENVIROMENT_SERVICE,
  IEnviromentService,
} from '@infrastructure/enviroment';

@Injectable()
export class StorageService implements IStorageService<MinioClient> {
  private readonly logger: Logger = new Logger(StorageService.name);

  get getClient(): MinioClient {
    return this.minioClient.client;
  }

  get bucketName(): string {
    return this.enviromentService.get<string>('MINIO_DEFAULT_BUCKETS');
  }

  constructor(
    private readonly minioClient: Client,
    @Inject(ENVIROMENT_SERVICE)
    private readonly enviromentService: IEnviromentService,
  ) {}

  async upload(
    file: any,
    bucketName: string = this.bucketName,
  ): Promise<string> {
    this.logger.log(`Uploading file to bucket: ${bucketName}`);
    const uploadedFile = await this.minioClient.client.putObject(
      bucketName,
      file.originalname,
      file.buffer,
    );

    return uploadedFile.etag;
  }

  async delete(
    file: string,
    bucketName: string = this.bucketName,
  ): Promise<void> {
    this.logger.log(`Deleting file from bucket: ${bucketName}`);
    await this.minioClient.client.removeObject(bucketName, file);
  }
}
