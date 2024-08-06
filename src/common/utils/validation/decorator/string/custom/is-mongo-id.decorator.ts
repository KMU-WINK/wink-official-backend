import { registerDecorator } from 'class-validator';

const MONGO_ID_REGEXP = /^[0-9a-fA-F]{24}$/;

export const IsMongoId = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property은(는) MongoDB ID 형식이어야 합니다.',
    },
    validator: {
      validate(value: unknown) {
        return typeof value === 'string' && MONGO_ID_REGEXP.test(value);
      },
    },
  });
};
