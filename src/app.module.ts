import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { UserModule } from '@presentation/user/user.module';
import { MeatModule } from '@presentation/meat/meat.module';
import validationSchema from '@config/validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', '.env')],
      validationSchema: validationSchema,
    }),
    UserModule,
    MeatModule
  ],
})
export class AppModule { }
