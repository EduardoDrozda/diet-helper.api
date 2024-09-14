import { MeatTypeEnum } from "@domain/enums";

export class CreateMeatDTO {
  name: string;
  description: string;
  eatenAt: string;
  type: MeatTypeEnum;
  userId: string;
}
