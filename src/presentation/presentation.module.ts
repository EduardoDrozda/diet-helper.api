import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { MeatModule } from './meat';

@Module({
  imports: [AuthModule, UserModule, MeatModule],
})
export class PresentationModule {}
