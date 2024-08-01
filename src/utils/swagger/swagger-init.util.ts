import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

export const swaggerInit = (app: INestApplication): void => {
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
      customCss: new SwaggerTheme().getBuffer(SwaggerThemeNameEnum.DARK),
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    },
  );
};