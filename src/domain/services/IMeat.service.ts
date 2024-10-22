import {
  CreateMeatDTO,
  GetMeatDTO,
  UpdateMeatDTO,
} from '@application/dtos/meat';

export const MEAT_SERVICE = Symbol('MEAT_SERVICE');

export interface IMeatService {
  findAllByUserId(userId: string): Promise<GetMeatDTO[]>;
  findById(id: string, userId: string): Promise<GetMeatDTO | null>;
  create(meat: CreateMeatDTO): Promise<GetMeatDTO>;
  update(id: string, meat: UpdateMeatDTO): Promise<GetMeatDTO>;
  delete(id: string, userId: string): Promise<void>;
}
