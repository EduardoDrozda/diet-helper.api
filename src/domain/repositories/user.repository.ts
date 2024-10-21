import { CreateUserInput, UpdateServiceInput, User } from '@domain/entities';

export const USER_REPOSITORY = Symbol('UserRepository');

export interface IUserRepository {
  create(user: CreateUserInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(user: UpdateServiceInput): Promise<User>;
}
