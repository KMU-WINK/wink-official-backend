import { registerDecorator } from 'class-validator';

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const IsUUID = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      message: '$property은(는) UUID 형식이어야 합니다.',
    },
    validator: {
      validate: (value: unknown) => {
        return typeof value === 'string' && UUID_REGEX.test(value);
      },
    },
  });
};
