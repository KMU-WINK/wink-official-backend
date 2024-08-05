import { registerDecorator } from 'class-validator';

export const IsStudentIdFormat = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property는 학번 형식이 아닙니다. (20000001 ~ 21009999)',
    },
    constraints: [],
    validator: {
      validate(value: any) {
        if (typeof value !== 'number') {
          return false;
        }

        return value >= 2000_0001 && value <= 2100_9999;
      },
    },
  });
};
