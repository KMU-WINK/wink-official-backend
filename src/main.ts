import { NestFactory } from '@nestjs/core';

import { AppModule } from './common/app';

import { LoggerService } from './common/utils/logger';
import { swaggerInit } from './common/utils/swagger';

(async () => {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerService,
  });

  app.setGlobalPrefix('/api');

  swaggerInit(app);

  await app.listen(8080);
})();
