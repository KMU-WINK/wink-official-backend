import { ValidationArguments, registerDecorator } from 'class-validator';

export const MaxValue =
  (maxValue: number) => (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        message: `$property은(는) ${maxValue} 이하여야 합니다.`,
      },
      constraints: [maxValue],
      validator: {
        validate: (value: unknown, args: ValidationArguments) => {
          const [maxValue] = args.constraints;

          return typeof value === 'number' && value <= maxValue;
        },
      },
    });
  };
