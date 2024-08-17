import { registerDecorator } from 'class-validator';

export const IsEnum =
  (type: Record<string, unknown>) => (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        message: `$property은(는) ${Object.values(type).join(', ')} 중 하나여야 합니다.`,
      },
      validator: {
        validate: (value: unknown) => {
          return Object.values(type).includes(value);
        },
      },
    });
  };
