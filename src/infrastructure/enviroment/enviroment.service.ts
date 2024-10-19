import { ConfigService } from '@nestjs/config';
import { EnviromentParams, IEnviromentService } from './IEnviroment.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnviromentService implements IEnviromentService {
  constructor(
    private readonly configService: ConfigService<EnviromentParams>,
  ) {}

  get<T>(key: keyof EnviromentParams): T {
    return this.configService.get<T>(key);
  }
}
