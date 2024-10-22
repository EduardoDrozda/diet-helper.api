import { CreateFileInput, File } from '@domain/entities/file.entity';

export const FILE_REPOSITORY = Symbol('IFileRepository');

export interface IFileRepository {
  create(data: CreateFileInput): Promise<File>;
  findByUrl(url: string): Promise<File>;
  update(data: File): Promise<File>;
}
