export const JWT_SERVICE = Symbol('JWT_SERVICE');

type Secret = string | Buffer | { key: string | Buffer; passphrase: string };

export interface JwtParams {
  secret?: string | Buffer;
  privateKey?: Secret;
}

export interface IJwtService {
  sign(payload: Record<string, any>, jwtParams?: JwtParams): Promise<string>;
  verify(token: string, jwtParams?: JwtParams): Promise<Record<string, any>>;
}
