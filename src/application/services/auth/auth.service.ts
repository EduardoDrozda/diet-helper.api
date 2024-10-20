import { CreateAuthDTO, GetAuthDTO } from '@application/dtos/auth';
import { IAuthService } from '@domain/services/auth/IAuth.service';
import { IUserService, USER_SERVICE } from '@domain/services/user';
import { HASH_SERVICE, IHashService } from '@infrastructure/hash';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
  ) {}

  async login({ email, password }: CreateAuthDTO): Promise<GetAuthDTO> {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await this.hashService.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return null;
  }
}
