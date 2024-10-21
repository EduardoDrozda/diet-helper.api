import { Module } from '@nestjs/common';

import { ApplicationModule } from '@application/application.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { PresentationModule } from '@presentation/presentation.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@infrastructure/guards';

@Module({
  imports: [ApplicationModule, InfrastructureModule, PresentationModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
