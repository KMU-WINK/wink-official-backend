import { registerDecorator } from 'class-validator';

export const MaxValue =
  (maxValue: number) => (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `$property는 ${maxValue}이하로 입력해주세요.`,
      },
      constraints: [maxValue],
      validator: {
        validate(value: any, args) {
          const [maxValue] = args.constraints;

          if (typeof value !== 'number') {
            return false;
          }

          return value <= maxValue;
        },
      },
    });
  };
