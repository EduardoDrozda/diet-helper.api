import { CreateFileInput, File } from '@domain/entities';
import { IFileRepository } from '@domain/repositories';
import { knex } from '@infrastructure/database';
import { Knex } from 'knex';

export class FileRepository implements IFileRepository {
  private readonly knex: Knex;

  constructor() {
    this.knex = knex;
  }

  async create(file: CreateFileInput): Promise<File> {
    const [result] = await this.knex<File>('files').insert(file).returning('*');
    return result;
  }

  async findByUrl(url: string): Promise<File> {
    return await this.knex<File>('files').where({ url }).first();
  }

  async update(file: File): Promise<File> {
    const [result] = await this.knex<File>('files')
      .where({ id: file.id })
      .update(file)
      .returning('*');
    return result;
  }
}
