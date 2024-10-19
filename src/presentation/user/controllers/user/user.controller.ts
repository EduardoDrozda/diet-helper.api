import { UploadFileDTO } from '@application/dtos/file/upload-file.dto';
import { CreateUserDTO, GetUserDTO } from '@application/dtos/user';
import { FileService } from '@application/services/file/file.service';
import { FILE_SERVICE } from '@domain/services/file';
import { IUserService, USER_SERVICE } from '@domain/services/user';

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    @Inject(FILE_SERVICE) private readonly fileService: FileService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GetUserDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() data: CreateUserDTO): Promise<GetUserDTO> {
    return await this.userService.create(data);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOperation({ summary: 'Upload user avatar' })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @HttpCode(HttpStatus.CREATED)
  async uploadAvatar(@UploadedFile() avatar: UploadFileDTO): Promise<void> {
    return await this.fileService.upload(avatar);
  }
}
