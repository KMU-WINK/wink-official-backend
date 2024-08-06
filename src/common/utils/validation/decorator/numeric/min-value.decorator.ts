import { registerDecorator, ValidationArguments } from 'class-validator';

export const MinValue =
  (minValue: number) => (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        message: `$property은(는) ${minValue} 이상이어야 합니다.`,
      },
      constraints: [minValue],
      validator: {
        validate: (value: unknown, args: ValidationArguments) => {
          const [minValue] = args.constraints;

          return typeof value === 'number' && value >= minValue;
        },
      },
    });
  };
