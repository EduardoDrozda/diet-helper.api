import { Module } from '@nestjs/common';
import { MeatController } from './controllers/meat/meat.controller';
import { MEAT_REPOSITORY } from '@domain/repositories';
import { MeatRepository } from '@infrastructure/repositories/meat';
import { MEAT_SERVICE } from '@domain/services';
import { MeatService } from '@application/services/meat';

@Module({
  controllers: [MeatController],
  providers: [
    {
      provide: MEAT_REPOSITORY,
      useClass: MeatRepository,
    },
    {
      provide: MEAT_SERVICE,
      useClass: MeatService,
    },
  ],
})
export class MeatModule {}
