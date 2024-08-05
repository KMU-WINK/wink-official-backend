import { registerDecorator } from 'class-validator';

export const IsBoolean = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: `$property는 올바른 Boolean 값이 아닙니다.`,
    },
    validator: {
      validate(value: any) {
        return typeof value === 'boolean';
      },
    },
  });
};
