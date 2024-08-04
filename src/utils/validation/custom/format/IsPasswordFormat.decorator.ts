import { registerDecorator } from 'class-validator';

const PASSWORD_REGEXP =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,24}$/;

export const IsPasswordFormat = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property는 비밀번호 형식이 아닙니다. (영문, 숫자, 특수문자 포함 8~24자)',
    },
    constraints: [],
    validator: {
      validate(value: any) {
        if (typeof value !== 'string') {
          return false;
        }

        return PASSWORD_REGEXP.test(value);
      },
    },
  });
};
