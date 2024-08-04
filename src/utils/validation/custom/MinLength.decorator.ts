import { registerDecorator } from 'class-validator';

export const MinLength =
  (minLength: number) => (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `$property는 ${minLength}자 이상으로 입력해주세요.`,
      },
      constraints: [minLength],
      validator: {
        validate(value: any, args) {
          const [minLength] = args.constraints;

          if (typeof value !== 'string') {
            return false;
          }

          return value.length >= minLength;
        },
      },
    });
  };
