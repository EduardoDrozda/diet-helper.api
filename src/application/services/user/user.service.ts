import { UploadFileDTO } from '@application/dtos/file/upload-file.dto';
import { CreateUserDTO, GetUserDTO } from '@application/dtos/user';

import { User } from '@domain/entities';
import { IUserRepository, USER_REPOSITORY } from '@domain/repositories';
import { IUserService } from '@domain/services/user';
import { HASH_SERVICE, IHashService } from '@infrastructure/hash';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
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

    const { email, name, created_at, updated_at } = user;
    return { id, email, name, created_at, updated_at };
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  uploadAvatar(id: string, avatar: UploadFileDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
