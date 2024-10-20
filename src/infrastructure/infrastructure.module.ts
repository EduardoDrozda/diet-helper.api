import validationSchema from '@config/validation.schema';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { join } from 'path';
import { ENVIROMENT_SERVICE, EnviromentService } from './enviroment';
import { STORAGE_CLIENT_SERVICE, StorageService } from './storage';
import { StorageClientService } from './storage/storage-client.service';
import { HASH_SERVICE, HashService } from './hash';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SERVICE } from './jwt/IJwt.service';
import { JwtService } from './jwt/jwt.service';

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
    JwtModule.registerAsync({
      inject: [ENVIROMENT_SERVICE],
      useFactory: (envService: EnviromentService) => ({
        global: true,
        secret: envService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: envService.get('JWT_EXPIRES_IN'),
        },
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
    {
      provide: HASH_SERVICE,
      useClass: HashService,
    },
    {
      provide: JWT_SERVICE,
      useClass: JwtService,
    },
  ],
  exports: [
    ENVIROMENT_SERVICE,
    STORAGE_CLIENT_SERVICE,
    HASH_SERVICE,
    JWT_SERVICE,
  ],
})
export class InfrastructureModule {}
