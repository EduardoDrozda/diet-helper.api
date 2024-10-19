import validationSchema from '@config/validation.schema';
import {
  ENVIROMENT_SERVICE,
  EnviromentService,
} from '@infrastructure/enviroment';
import {
  STORAGE_CLIENT_SERVICE,
  StorageService,
} from '@infrastructure/storage';
import { StorageClientService } from '@infrastructure/storage/storage-client.service';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', '.env')],
      validationSchema: validationSchema,
    }),
    MinioModule.registerAsync({
      inject: [ENVIROMENT_SERVICE],
      useFactory: (envService: EnviromentService) => ({
        endPoint: envService.get('MINIO_ENDPOINT'),
        port: parseInt(envService.get('MINIO_PORT')),
        useSSL: false,
        accessKey: envService.get('MINIO_ROOT_USER'),
        secretKey: envService.get('MINIO_ROOT_PASSWORD'),
      }),
    }),
  ],
  providers: [
    StorageService,
    {
      provide: ENVIROMENT_SERVICE,
      useClass: EnviromentService,
    },
    {
      provide: STORAGE_CLIENT_SERVICE,
      useClass: StorageClientService,
    },
  ],
  exports: [ENVIROMENT_SERVICE, STORAGE_CLIENT_SERVICE],
})
export class GlobalModule {}
