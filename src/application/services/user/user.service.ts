import { CreateUserDTO, GetUserDTO } from '@application/dtos/user';
import { IUserService } from '@application/services/user';
import { User } from '@domain/entities';
import { IUserRepository, USER_REPOSITORY } from '@domain/repositories';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
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
      password,
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

  private async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}
