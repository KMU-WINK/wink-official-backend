import { registerDecorator } from 'class-validator';

export const IsNotEmpty = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      message: '$property은(는) 빈 값이어서는 안됩니다.',
    },
    validator: {
      validate: (value: unknown) => {
        return value !== null && value !== undefined && value !== '';
      },
    },
  });
};
