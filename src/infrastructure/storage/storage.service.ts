import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  IStorageService,
  StorageFile,
  StoredFile,
  UploadParams,
} from './IStorage.service';
import * as Minio from 'minio';

import {
  ENVIROMENT_SERVICE,
  IEnviromentService,
} from '@infrastructure/enviroment';

@Injectable()
export class StorageService implements IStorageService<Minio.Client> {
  private readonly logger: Logger = new Logger(StorageService.name);
  private readonly minioClient: Minio.Client;

  get defaultBucketName(): string {
    return this.enviromentService.get<string>('MINIO_DEFAULT_BUCKETS');
  }

  get client(): Minio.Client {
    return this.minioClient;
  }

  constructor(
    @Inject(ENVIROMENT_SERVICE)
    private readonly enviromentService: IEnviromentService,
  ) {
    this.minioClient = new Minio.Client({
      endPoint: this.enviromentService.get<string>('MINIO_ENDPOINT'),
      port: parseInt(this.enviromentService.get<string>('MINIO_PORT')),
      useSSL: false,
      accessKey: this.enviromentService.get<string>('MINIO_ROOT_USER'),
      secretKey: this.enviromentService.get<string>('MINIO_ROOT_PASSWORD'),
    });
  }

  async createBucketIfNotExists(
    bucketName: string = this.defaultBucketName,
  ): Promise<void> {
    const bucketExists = await this.client.bucketExists(bucketName);

    if (!bucketExists) {
      await this.client.makeBucket(bucketName, 'eu-west-1');
    }
  }

  async upload(file: StorageFile, params?: UploadParams): Promise<StoredFile> {
    const bucketName = this.getBucketName(params);

    this.logger.log(`Uploading file to bucket: ${bucketName}`);
    const fileName = `${Date.now()}-${file.originalname}`;
    await this.client.putObject(bucketName, fileName, file.buffer, file.size);

    if (params?.isPublic) {
      await this.makeFilePublic(fileName, { bucketName });
    }

    return {
      url: this.getUrl(fileName, bucketName),
      name: fileName,
    };
  }

  private getBucketName(params?: UploadParams): string {
    return params?.bucketName || this.defaultBucketName;
  }

  async makeFilePublic(file: string, params?: UploadParams): Promise<void> {
    const bucketName = this.getBucketName(params);
    this.logger.log(`Making file public in bucket: ${bucketName}`);
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'MakeItPublic',
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucketName}/${file}`],
        },
      ],
    };

    await this.client.setBucketPolicy(bucketName, JSON.stringify(policy));
  }

  private getUrl(
    file: string,
    bucketName: string = this.defaultBucketName,
  ): string {
    const url = this.enviromentService.get<string>('MINIO_URL');
    return `${url}/${bucketName}/${file}`;
  }

  async getPresignedUrl(file: string, params?: UploadParams): Promise<string> {
    const bucketName = this.getBucketName(params);
    this.logger.log(`Getting presigned url for file: ${file}`);
    return this.client.presignedGetObject(bucketName, file, 24 * 60 * 60);
  }

  async delete(file: string, params?: UploadParams): Promise<void> {
    const bucketName = this.getBucketName(params);
    this.logger.log(`Deleting file from bucket: ${bucketName}`);
    await this.client.removeObject(bucketName, file);
  }
}
