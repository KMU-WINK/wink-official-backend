import { registerDecorator } from 'class-validator';

export const MinValue =
  (minValue: number) => (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `$property는 ${minValue}이상으로 입력해주세요.`,
      },
      constraints: [minValue],
      validator: {
        validate(value: any, args) {
          const [minValue] = args.constraints;

          if (typeof value !== 'number') {
            return false;
          }

          return value >= minValue;
        },
      },
    });
  };
