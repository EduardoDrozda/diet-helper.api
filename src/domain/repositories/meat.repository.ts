import { CreateMeatInput, Meat, UpdateMeatInput } from '@domain/entities';

export const MEAT_REPOSITORY = Symbol('MEAT_REPOSITORY');

export interface IMeatRepository {
  findAllByUserId(user_id: string): Promise<Meat[]>;
  findById(id: string, userId: string): Promise<Meat | null>;
  create(meat: CreateMeatInput): Promise<Meat>;
  update(id: string, meat: UpdateMeatInput): Promise<Meat>;
  delete(id: string): Promise<void>;
}
