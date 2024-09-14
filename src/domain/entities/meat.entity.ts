import { MeatTypeEnum } from "@domain/enums";

export type Meat = {
  id: string;
  name: string;
  description: string;
  eaten_at: string;
  type: MeatTypeEnum;
  user_id: string;

  createdAt: string;
  updatedAt: string;
}

export type CreateMeatInput = Pick<Meat, 'name' | 'description' | 'eaten_at' | 'type' | 'user_id'>;
export type UpdateMeatInput = Partial<CreateMeatInput>;
