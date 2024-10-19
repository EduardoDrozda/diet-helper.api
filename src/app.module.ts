import { Module } from '@nestjs/common';

import { UserModule } from '@presentation/user/user.module';
import { MeatModule } from '@presentation/meat/meat.module';
import { GlobalModule } from '@infrastructure/modules/global/global.module';

@Module({
  imports: [GlobalModule, UserModule, MeatModule],
})
export class AppModule {}
