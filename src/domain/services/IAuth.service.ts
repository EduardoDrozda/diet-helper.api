import { CreateAuthDTO, GetAuthDTO } from '@application/dtos/auth';

export const AUTH_SERVICE = Symbol('IAuthService');

export interface IAuthService {
  login(data: CreateAuthDTO): Promise<GetAuthDTO>;
}
