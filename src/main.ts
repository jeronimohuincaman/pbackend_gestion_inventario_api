import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationTypes } from 'class-validator';
import { envs } from './configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  app.enableCors();

  const logger = new Logger('Main');

  app.setGlobalPrefix('api');

  await app.listen(envs.port);

  logger.log(`Server running on port: ${envs.port}`);
}
bootstrap();
