import { NestFactory } from '@nestjs/core';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

import { WinstonLogger } from './utils/logger/WinstonLogger';
import { ResponseInterceptor } from './utils/interceptor/ResponseInterceptor';
import {
  HttpExceptionResponseFilter,
  NotFoundExceptionResponseFilter,
} from './utils/interceptor/ErrorResponseFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        return new HttpException(Object.entries(errors[0].constraints)[0][1], 400);
      },
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionResponseFilter());
  app.useGlobalFilters(new NotFoundExceptionResponseFilter());

  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Wink Official')
        .setDescription('윙크 공식 홈페이지 API 명세서')
        .setVersion('1.0.0')
        .addSecurity('bearer', { type: 'http', scheme: 'bearer' })
        .build(),
    ),
    {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    },
  );

  await app.listen(8080);
}

bootstrap();
