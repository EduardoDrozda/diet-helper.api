import { UploadFileDTO } from '@application/dtos/file/upload-file.dto';
import { CreateUserDTO, GetUserDTO } from '@application/dtos/user';

import { User } from '@domain/entities';
import { IUserRepository, USER_REPOSITORY } from '@domain/repositories';
import { FILE_SERVICE, IFileService } from '@domain/services/file';
import { IUserService } from '@domain/services/user';
import { HASH_SERVICE, IHashService } from '@infrastructure/hash';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
    @Inject(FILE_SERVICE) private readonly fileService: IFileService,
  ) {}

  async create(data: CreateUserDTO): Promise<GetUserDTO> {
    const user = await this.findByEmail(data.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const { name, email, password } = data;

    const { id, created_at, updated_at } = await this.userRepository.create({
      name,
      email,
      password: await this.hashService.hash(password),
    });

    return { id, name, email, created_at, updated_at };
  }

  async findById(id: string): Promise<GetUserDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { email, name, created_at, updated_at, avatar_url } = user;
    return { id, email, name, avatar_url, created_at, updated_at };
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async uploadAvatar(
    userId: string,
    avatar: UploadFileDTO,
  ): Promise<GetUserDTO> {
    const user = await this.findById(userId);
    const file = await this.getAvatarURl(user, avatar);

    user.avatar_url = file.url;

    const { avatar_url, updated_at } = await this.userRepository.update(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url,
      created_at: user.created_at,
      updated_at,
    };
  }

  private async getAvatarURl(user: GetUserDTO, avatar: UploadFileDTO) {
    const file = await this.fileService.findByUrl(user.avatar_url);

    if (!file) {
      console.log('upload');
      return await this.fileService.upload(user.id, avatar);
    }

    console.log('update');
    return await this.fileService.update(file, avatar);
  }
}
