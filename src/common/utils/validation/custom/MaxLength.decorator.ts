import { registerDecorator } from 'class-validator';

export const MaxLength =
  (maxLength: number) => (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `$property는 ${maxLength}자 이하로 입력해주세요.`,
      },
      constraints: [maxLength],
      validator: {
        validate(value: any, args) {
          const [maxLength] = args.constraints;

          if (typeof value !== 'string') {
            return false;
          }

          return value.length <= maxLength;
        },
      },
    });
  };
