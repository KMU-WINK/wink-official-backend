import { ValidationArguments, registerDecorator } from 'class-validator';

export const MinLength =
  (minLength: number) => (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        message: `$property은(는) ${minLength}자 이상이어야 합니다.`,
      },
      constraints: [minLength],
      validator: {
        validate: (value: unknown, args: ValidationArguments) => {
          const [minLength] = args.constraints;

          return typeof value === 'string' && value.length >= minLength;
        },
      },
    });
  };
