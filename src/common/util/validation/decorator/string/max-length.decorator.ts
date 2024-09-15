import { ValidationArguments, registerDecorator } from 'class-validator';

export const MaxLength =
  (maxLength: number) => (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        message: `$property은(는) ${maxLength}자 이하여야 합니다.`,
      },
      constraints: [maxLength],
      validator: {
        validate: (value: unknown, args: ValidationArguments) => {
          const [maxLength] = args.constraints;

          return typeof value === 'string' && value.length <= maxLength;
        },
      },
    });
  };
