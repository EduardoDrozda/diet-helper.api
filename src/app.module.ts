import { Module } from '@nestjs/common';

import { ApplicationModule } from '@application/application.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { PresentationModule } from '@presentation/presentation.module';

@Module({
  imports: [ApplicationModule, InfrastructureModule, PresentationModule],
})
export class AppModule {}
