import { Inject, Injectable } from '@nestjs/common';
import { IJwtService, JwtParams } from './IJwt.service';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import {
  ENVIROMENT_SERVICE,
  IEnviromentService,
} from '@infrastructure/enviroment';

@Injectable()
export class JwtService implements IJwtService {
  constructor(
    @Inject(ENVIROMENT_SERVICE)
    private readonly enviromentService: IEnviromentService,
    private readonly jwt: NestJwtService,
  ) {}

  async sign(
    payload: Record<string, any>,
    jwtParams: JwtParams = this.initializeJwtParams(),
  ): Promise<string> {
    if (!jwtParams) {
      jwtParams = this.initializeJwtParams();
    }

    return this.jwt.signAsync(payload, jwtParams);
  }

  private initializeJwtParams(): JwtParams {
    return {
      secret: this.enviromentService.get('JWT_SECRET'),
    };
  }

  async verify(
    token: string,
    jwtParams: JwtParams = this.initializeJwtParams(),
  ): Promise<Record<string, any>> {
    return this.jwt.verifyAsync(token, jwtParams);
  }
}
