import { registerDecorator } from 'class-validator';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const IsEmail = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      message: '$property은(는) 이메일 형식이어야 합니다.',
    },
    validator: {
      validate: (value: unknown) => {
        return typeof value === 'string' && EMAIL_REGEX.test(value);
      },
    },
  });
};
