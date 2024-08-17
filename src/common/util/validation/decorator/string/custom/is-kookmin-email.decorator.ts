import { registerDecorator } from 'class-validator';

const KOOKMIN_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@kookmin\.ac\.kr$/i;

export const IsKookminEmail = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property은(는) 국민대학교 이메일 형식이어야 합니다.',
    },
    validator: {
      validate(value: unknown) {
        return typeof value === 'string' && KOOKMIN_EMAIL_REGEX.test(value);
      },
    },
  });
};
