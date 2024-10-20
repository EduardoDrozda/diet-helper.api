import { UploadFileDTO } from '@application/dtos/file/upload-file.dto';
import { CreateUserDTO, GetUserDTO } from '@application/dtos/user';
import { User } from '@domain/entities';

export const USER_SERVICE = Symbol('UserService');

export interface IUserService {
  create(data: CreateUserDTO): Promise<GetUserDTO>;
  findById(id: string): Promise<GetUserDTO>;
  uploadAvatar(id: string, avatar: UploadFileDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}
