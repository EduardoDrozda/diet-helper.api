import { MeatTypeEnum } from "@domain/enums";

export class UpdateMeatDTO {
  name: string;
  description: string;
  eatenAt: string;
  type: MeatTypeEnum;
  userId: string;
}
