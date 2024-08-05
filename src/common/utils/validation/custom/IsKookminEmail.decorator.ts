import { registerDecorator } from 'class-validator';

const EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)*kookmin\.ac\.kr$/;

export const IsKookminEmail = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: `$property는 국민대학교 이메일 형식이 아닙니다.`,
    },
    validator: {
      validate(value: any) {
        if (typeof value !== 'string') {
          return false;
        }

        return EMAIL_REGEXP.test(value);
      },
    },
  });
};
