import { registerDecorator } from 'class-validator';

export const IsNumberString = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: `$property는 숫자 문자열이 아닙니다.`,
    },
    validator: {
      validate(value: any) {
        return typeof value === 'string' && !isNaN(Number(value));
      },
    },
  });
};
