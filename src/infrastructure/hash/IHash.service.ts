export const HASH_SERVICE = Symbol('IHashService');

export interface IHashService {
  hash(value: string, rounds?: number): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}
