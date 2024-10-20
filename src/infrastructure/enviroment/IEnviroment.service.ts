export interface EnviromentParams {
  APP_PORT: string;
  DB_CONNECTION: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  MINIO_URL: string;
  MINIO_ENDPOINT: string;
  MINIO_PORT: string;
  MINIO_ROOT_USER: string;
  MINIO_ROOT_PASSWORD: string;
  MINIO_DEFAULT_BUCKETS: string;
}

export const ENVIROMENT_SERVICE = Symbol('ENVIROMENT_SERVICE');

export interface IEnviromentService {
  get<T>(key: keyof EnviromentParams): T;
}
