import { registerDecorator } from 'class-validator';

const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const IsEmail = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: `$property는 이메일 형식이 아닙니다.`,
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
