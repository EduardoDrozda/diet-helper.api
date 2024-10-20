import { IHashService } from './IHash.service';
import bcrypt from 'bcrypt';

export class HashService implements IHashService {
  async hash(value: string, salt = 10): Promise<string> {
    return bcrypt.hashSync(value, salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(value, hash);
  }
}
