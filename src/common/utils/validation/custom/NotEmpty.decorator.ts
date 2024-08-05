import { registerDecorator, ValidationOptions } from 'class-validator';

export function NotEmpty(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `$property는 필수 입력 값입니다.`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          if (typeof value === 'string') {
            return value.trim().length > 0;
          }

          return value !== null && value !== undefined;
        },
      },
    });
  };
}
