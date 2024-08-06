import { registerDecorator } from 'class-validator';

const PASSWORD_REGEXP = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,}$/;

export const IsPassword = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      message: '$property은(는) 비밀번호이어야 합니다. (영문, 숫자, 특수문자 포함)',
    },
    validator: {
      validate: (value: unknown) => {
        return typeof value === 'string' && PASSWORD_REGEXP.test(value);
      },
    },
  });
};
