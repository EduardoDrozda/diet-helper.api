import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';
import { ENVIROMENT_SERVICE } from '@infrastructure/enviroment';
import { environmentServiceMock } from '@shared/mocks/services';
import { StorageFile } from './IStorage.service';
import { FileMimeType } from '@domain/enums';

jest.mock('minio', () => ({
  Client: jest.fn().mockImplementation(() => ({
    bucketExists: jest.fn().mockResolvedValue(true),
    makeBucket: jest.fn().mockResolvedValue(true),
    putObject: jest.fn().mockResolvedValue(true),
    setBucketPolicy: jest.fn().mockResolvedValue(true),
    presignedGetObject: jest.fn().mockResolvedValue('url'),
    removeObject: jest.fn().mockResolvedValue(true),
  })),
}));

describe('StorageService', () => {
  let service: StorageService;
  let storageClientService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorageService,
        {
          provide: ENVIROMENT_SERVICE,
          useValue: environmentServiceMock,
        },
      ],
    }).compile();

    service = module.get<StorageService>(StorageService);
    storageClientService = service.client;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not create a bucket if it exists', async () => {
    await service.createBucketIfNotExists();

    expect(service.client.bucketExists).toHaveBeenCalled();
    expect(service.client.makeBucket).not.toHaveBeenCalled();
  });

  it('should create a bucket if it does not exist', async () => {
    jest.spyOn(storageClientService, 'bucketExists').mockResolvedValue(false);
    await service.createBucketIfNotExists();

    expect(service.client.bucketExists).toHaveBeenCalled();
    expect(service.client.makeBucket).toHaveBeenCalled();
  });

  it('should upload a file not public', async () => {
    const file: StorageFile = {
      buffer: Buffer.from('file'),
      size: 4,
      originalname: 'file.txt',
      encoding: 'utf-8',
      mimetype: FileMimeType.ImageJpeg,
      fieldname: 'file',
    };

    await service.upload(file);

    expect(service.client.putObject).toHaveBeenCalled();
    expect(service.client.setBucketPolicy).not.toHaveBeenCalled();
  });

  it('should upload a file public', async () => {
    const file: StorageFile = {
      buffer: Buffer.from('file'),
      size: 4,
      originalname: 'file.txt',
      encoding: 'utf-8',
      mimetype: FileMimeType.ImageJpeg,
      fieldname: 'file',
    };

    await service.upload(file, { isPublic: true });

    expect(service.client.putObject).toHaveBeenCalled();
    expect(service.client.setBucketPolicy).toHaveBeenCalled();
  });

  it('should make file public', async () => {
    await service.makeFilePublic('file.txt');

    expect(service.client.setBucketPolicy).toHaveBeenCalled();
  });

  it('should getPreSignedUrl', async () => {
    const url = service.getPresignedUrl('file.txt');

    expect(url).toBeDefined();
    expect(service.client.presignedGetObject).toHaveBeenCalled();
  });

  it('should getPreSignedUrl with params', async () => {
    const url = service.getPresignedUrl('file.txt', { bucketName: 'bucket' });

    expect(url).toBeDefined();
    expect(service.client.presignedGetObject).toHaveBeenCalled();
  });

  it('should delete file', async () => {
    await service.delete('file.txt');

    expect(service.client.removeObject).toHaveBeenCalled();
  });

  it('should delete file with params', async () => {
    await service.delete('file.txt', { bucketName: 'bucket' });

    expect(service.client.removeObject).toHaveBeenCalled();
  });
});
