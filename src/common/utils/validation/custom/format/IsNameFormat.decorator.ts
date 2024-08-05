import { registerDecorator } from 'class-validator';

const NAME_REGEXP = /^[가-힣]{2,5}$/;

export const IsNameFormat = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property는 이름 형식이 아닙니다.',
    },
    constraints: [],
    validator: {
      validate(value: any) {
        if (typeof value !== 'string') {
          return false;
        }

        return NAME_REGEXP.test(value);
      },
    },
  });
};
