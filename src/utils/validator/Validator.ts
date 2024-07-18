import { ArgumentMetadata, HttpException, ValidationPipe } from '@nestjs/common';

export class Validator {
  private readonly validator: ValidationPipe;

  constructor() {
    this.validator = Validator.getValidationPipe();
  }

  static getValidationPipe(): ValidationPipe {
    return new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        return new HttpException(Object.entries(errors[0].constraints)[0][1], 400);
      },
    });
  }

  async validateBody<T>(body: T, metatype: new () => T): Promise<any> {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype,
      data: '',
    };

    return await this.validator.transform(body, metadata);
  }
}
