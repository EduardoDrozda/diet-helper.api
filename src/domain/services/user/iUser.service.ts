import { CreateUserDTO, GetUserDTO } from '@application/dtos/user';

export const USER_SERVICE = Symbol('UserService');

export interface IUserService {
  create(data: CreateUserDTO): Promise<GetUserDTO>;
  findById(id: string): Promise<GetUserDTO>;
}
