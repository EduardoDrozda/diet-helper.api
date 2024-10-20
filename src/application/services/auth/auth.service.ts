import { CreateAuthDTO, GetAuthDTO } from '@application/dtos/auth';
import { IAuthService } from '@domain/services/auth/IAuth.service';
import { IUserService, USER_SERVICE } from '@domain/services/user';
import { HASH_SERVICE, IHashService } from '@infrastructure/hash';
import { IJwtService, JWT_SERVICE } from '@infrastructure/jwt/IJwt.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
  ) {}

  async login({ email, password }: CreateAuthDTO): Promise<GetAuthDTO> {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await this.hashService.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token: {
        type: 'Bearer',
        access_token: token,
      },
    };
  }
}
