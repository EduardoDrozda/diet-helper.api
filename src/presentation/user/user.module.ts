import { Module } from '@nestjs/common';
import { UserController } from './controllers/user';

import { UserRepository } from '@infrastructure/repositories/user';
import { FILE_REPOSITORY, USER_REPOSITORY } from '@domain/repositories';
import { USER_SERVICE } from '@domain/services/user';
import { UserService } from '@application/services/user';
import { FILE_SERVICE } from '@domain/services/file';
import { FileService } from '@application/services/file/file.service';
import { FileRepository } from '@infrastructure/repositories/file/file.repository';

@Module({
  controllers: [UserController],
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
})
export class UserModule {}
