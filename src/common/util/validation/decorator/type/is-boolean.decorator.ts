import { registerDecorator } from 'class-validator';

export const IsBoolean = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      message: '$property은(는) 불 대수이어야 합니다.',
    },
    validator: {
      validate: (value: unknown) => {
        return typeof value === 'boolean';
      },
    },
  });
};
