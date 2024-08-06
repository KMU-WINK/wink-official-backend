import { registerDecorator } from 'class-validator';

const NAME_REGEXP = /^[가-힣]{2,5}$/;

export const IsName = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property은(는) 이름이어야 합니다.',
    },
    validator: {
      validate(value: unknown) {
        return typeof value === 'string' && NAME_REGEXP.test(value);
      },
    },
  });
};
