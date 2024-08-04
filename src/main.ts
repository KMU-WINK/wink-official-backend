import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { LoggerService, swaggerInit } from './utils';

(async () => {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerService,
  });

  app.setGlobalPrefix('/api');

  swaggerInit(app);

  await app.listen(8080);
})();
