import { registerDecorator, ValidationArguments } from 'class-validator';

export const Length = (length: number) => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      message: `$property은(는) ${length}자여야 합니다.`,
    },
    constraints: [length],
    validator: {
      validate: (value: unknown, args: ValidationArguments) => {
        const [length] = args.constraints;

        return typeof value === 'string' && value.length == length;
      },
    },
  });
};
