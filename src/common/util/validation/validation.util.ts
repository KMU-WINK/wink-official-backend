import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

type Constraints = { [type: string]: string };

export class Validation {
  private readonly validator: ValidationPipe;

  constructor() {
    this.validator = Validation.getValidationPipe();
  }

  static getValidationPipe(): ValidationPipe {
    return new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        return new ApiException({
          swagger: 'Validation Error',
          message: Object.entries(<Constraints>errors[0].constraints)[0][1],
          code: 400,
        });
      },
    });
  }

  async validateBody<T>(body: T, metatype: new () => T): Promise<unknown> {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype,
      data: '',
    };

    return this.validator.transform(body, metadata);
  }
}
