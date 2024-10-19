import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IMeatRepository, MEAT_REPOSITORY } from '@domain/repositories';
import {
  GetMeatDTO,
  CreateMeatDTO,
  UpdateMeatDTO,
} from '@application/dtos/meat';
import { IMeatService } from '@domain/services/meat';

@Injectable()
export class MeatService implements IMeatService {
  constructor(
    @Inject(MEAT_REPOSITORY) private readonly meatRepository: IMeatRepository,
  ) {}

  async findAllByUserId(userId: string): Promise<GetMeatDTO[]> {
    const result = await this.meatRepository.findAllByUserId(userId);

    return result.map((meat) => ({
      ...meat,
      eatenAt: meat.eaten_at,
      type: meat.type,
      userId: meat.user_id,
    }));
  }

  async findById(id: string, userId: string): Promise<GetMeatDTO> {
    const meat = await this.meatRepository.findById(id, userId);

    if (!meat) {
      throw new NotFoundException('Meat not found');
    }

    return {
      ...meat,
      eatenAt: meat.eaten_at,
      type: meat.type,
      userId: meat.user_id,
    };
  }

  async create(meat: CreateMeatDTO): Promise<GetMeatDTO> {
    const result = await this.meatRepository.create({
      name: meat.name,
      type: meat.type,
      eaten_at: meat.eatenAt,
      user_id: meat.userId,
      description: meat.description,
    });

    return {
      id: result.id,
      name: result.name,
      description: result.description,
      eatenAt: result.eaten_at,
      type: result.type,
      userId: result.user_id,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async update(id: string, meat: UpdateMeatDTO): Promise<GetMeatDTO> {
    await this.findById(id, meat.userId);

    const result = await this.meatRepository.update(id, meat);
    return {
      ...result,
      eatenAt: result.eaten_at,
      type: result.type,
      userId: result.user_id,
    };
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findById(id, userId);
    return await this.meatRepository.delete(id);
  }
}
