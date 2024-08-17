import { NestFactory } from '@nestjs/core';

import { AppModule } from '@wink/app';

import { LoggerService } from '@wink/logger';
import { swaggerInit } from '@wink/swagger';

(async () => {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerService,
  });

  app.setGlobalPrefix('/api');

  swaggerInit(app);

  await app.listen(8080);
})();
