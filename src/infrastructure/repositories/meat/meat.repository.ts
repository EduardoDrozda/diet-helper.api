import { Meat, CreateMeatInput, UpdateMeatInput } from '@domain/entities';
import { IMeatRepository } from '@domain/repositories';
import { knex } from '@infrastructure/database';
import { Knex } from 'knex';

export class MeatRepository implements IMeatRepository {
  private readonly knex: Knex;

  constructor() {
    this.knex = knex;
  }

  async findAllByUserId(userId: string): Promise<Meat[]> {
    return this.knex<Meat>('meats').select('*').where('user_id', userId);
  }

  async findById(id: string, userId: string): Promise<Meat | null> {
    return this.knex<Meat>('meats')
      .select('*')
      .where('id', id)
      .and.where('user_id', userId)
      .first();
  }

  async create(meat: CreateMeatInput): Promise<Meat> {
    const [result] = await this.knex<Meat>('meats').insert(meat).returning('*');
    return result;
  }

  async update(id: string, meat: UpdateMeatInput): Promise<Meat> {
    const [result] = await this.knex<Meat>('meats')
      .where('id', id)
      .update(meat)
      .returning('*');
    return result;
  }

  async delete(id: string): Promise<void> {
    this.knex<Meat>('meats').where('id', id).delete();
  }
}
