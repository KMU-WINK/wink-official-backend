import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { WinstonLogger } from './utils/logger/WinstonLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger,
  });

  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Wink Official')
        .setDescription('윙크 공식 홈페이지 API 명세서')
        .setVersion('1.0.0')
        .build(),
    ),
    {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    },
  );

  await app.listen(3000);
}

bootstrap();
