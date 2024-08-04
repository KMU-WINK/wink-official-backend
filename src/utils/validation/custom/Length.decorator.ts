import { registerDecorator } from 'class-validator';

export const Length = (length: number) => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: `$property는 ${length}자로 입력해주세요.`,
    },
    constraints: [length],
    validator: {
      validate(value: any, args) {
        const [length] = args.constraints;

        if (typeof value !== 'string') {
          return false;
        }

        return value.length === length;
      },
    },
  });
};
