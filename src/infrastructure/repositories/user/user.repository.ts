import { User } from '@domain/entities';
import { IUserRepository } from '@domain/repositories';
import { knex } from '@infrastructure/database';
import { Knex } from 'knex';


export class UserRepository implements IUserRepository {

  constructor(private readonly database: Knex = knex) {
  }

  async create(user: Pick<User, 'name' | 'email' | 'password'>): Promise<any> {
    const [{ id }] = await this.database('users').insert(user).returning('id');

    return {
      ...user,
      id,
    };
  }

  async findById(id: string): Promise<User | null> {
    return this.database('users').where('id', id).first();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.database('users').where('email', email).first();
  }
}
