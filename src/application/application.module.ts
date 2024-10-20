import { FILE_REPOSITORY, USER_REPOSITORY } from '@domain/repositories';
import { USER_SERVICE } from '@domain/services/user';
import { UserRepository } from '@infrastructure/repositories/user';
import { Global, Module } from '@nestjs/common';
import { UserService } from './services/user';
import { FileRepository } from '@infrastructure/repositories/file/file.repository';
import { FILE_SERVICE } from '@domain/services/file';
import { FileService } from './services/file/file.service';

@Global()
@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: FILE_REPOSITORY,
      useClass: FileRepository,
    },
    {
      provide: FILE_SERVICE,
      useClass: FileService,
    },
  ],
  exports: [USER_SERVICE, USER_REPOSITORY, FILE_SERVICE, FILE_REPOSITORY],
})
export class ApplicationModule {}
