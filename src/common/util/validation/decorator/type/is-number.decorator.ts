import { registerDecorator } from 'class-validator';

export const IsNumber = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      message: '$property은(는) 숫자이어야 합니다.',
    },
    validator: {
      validate: (value: unknown) => {
        return typeof value === 'number';
      },
    },
  });
};
