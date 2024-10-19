import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ENVIROMENT_SERVICE,
  IEnviromentService,
} from '@infrastructure/enviroment';

export class Application {
  private app: INestApplication;
  private enviromentService: IEnviromentService;
  private globalPrefix = 'api';

  private async setApplication(): Promise<void> {
    this.app = await NestFactory.create(AppModule);
    this.enviromentService = this.app.get(ENVIROMENT_SERVICE);
  }

  private async setGlobalScopes(): Promise<void> {
    this.app.setGlobalPrefix(this.globalPrefix);
    this.app.useGlobalPipes(new ValidationPipe());
  }

  private getPort(): number {
    return this.enviromentService.get<number>('APP_PORT');
  }

  private async configSwagger(): Promise<void> {
    const config = new DocumentBuilder()
      .setTitle('Diet Helper')
      .setDescription('API documentation for Diet Helper')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('swagger', this.app, document);
  }

  async start(): Promise<void> {
    await this.setApplication();
    await this.setGlobalScopes();
    await this.configSwagger();
    const port = this.getPort();

    await this.app
      .listen(port)
      .then(() => {
        Logger.log(
          `🚀 Application is running on: http://localhost:${port}/${this.globalPrefix}`,
          'Application',
        );
      })
      .catch((error) => {
        Logger.error(`Error starting application: ${error}`, 'Application');
        process.exit(1);
      });
  }
}
