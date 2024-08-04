import { registerDecorator } from 'class-validator';

const OBJECT_ID_REGEXP = /^[0-9a-fA-F]{24}$/;

export const IsObjectIdFormat = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property는 올바른 Object ID 형식이 아닙니다.',
    },
    constraints: [],
    validator: {
      validate(value: any) {
        if (typeof value !== 'string') {
          return false;
        }

        return OBJECT_ID_REGEXP.test(value);
      },
    },
  });
};
