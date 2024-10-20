export const HASH_SERVICE = Symbol('IHashService');

export interface IHashService {
  hash(value: string, salt?: number): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}
