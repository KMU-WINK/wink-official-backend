import { registerDecorator } from 'class-validator';

export const IsString = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      message: '$property은(는) 문자열이어야 합니다.',
    },
    validator: {
      validate: (value: unknown) => {
        return typeof value === 'string';
      },
    },
  });
};
