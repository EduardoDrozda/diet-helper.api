import { Inject, Injectable } from '@nestjs/common';
import { IHashService } from './IHash.service';
import * as bcrypt from 'bcrypt';
import {
  ENVIROMENT_SERVICE,
  EnviromentService,
} from '@infrastructure/enviroment';

@Injectable()
export class HashService implements IHashService {
  constructor(
    @Inject(ENVIROMENT_SERVICE)
    private readonly enviromentService: EnviromentService,
  ) {}

  private getRounds(): number {
    return Number(this.enviromentService.get('HASH_ROUNDS'));
  }

  async hash(value: string, rounds = this.getRounds()): Promise<string> {
    return bcrypt.hashSync(value, rounds);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(value, hash);
  }
}
