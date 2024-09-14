import { registerDecorator } from 'class-validator';

export const IsStringArray = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      message: '$property은(는) 문자열 배열이어야 합니다.',
    },
    validator: {
      validate: (value: unknown) => {
        return Array.isArray(value) && value.every((v) => typeof v === 'string');
      },
    },
  });
};
