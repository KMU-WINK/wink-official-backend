import { registerDecorator } from 'class-validator';

export const IsEnum =
  (type: Record<string, any>) => (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `$property는 올바른 값이 아닙니다. (${Object.values(type).join(', ')})`,
      },
      validator: {
        validate(value: any) {
          return Object.values(type).includes(value);
        },
      },
    });
  };
