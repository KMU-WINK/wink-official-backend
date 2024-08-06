import { ArgumentMetadata, HttpException, ValidationPipe } from '@nestjs/common';

type ContraintsType = { [type: string]: string };

export class Validation {
  private readonly validator: ValidationPipe;

  constructor() {
    this.validator = Validation.getValidationPipe();
  }

  static getValidationPipe(): ValidationPipe {
    return new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        return new HttpException(Object.entries(<ContraintsType>errors[0].constraints)[0][1], 400);
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
