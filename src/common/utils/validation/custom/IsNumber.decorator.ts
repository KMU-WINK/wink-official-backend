import { registerDecorator } from 'class-validator';

export const IsNumber = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: `$property는 숫자가 아닙니다.`,
    },
    validator: {
      validate(value: any) {
        return typeof value === 'number';
      },
    },
  });
};
