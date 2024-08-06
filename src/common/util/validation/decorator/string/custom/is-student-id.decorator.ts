import { registerDecorator } from 'class-validator';

const STUDENT_ID_REGEXP = /^(19|20)\d{2}(?!0000)(0[0-9]{3}|[1-9][0-9]{3})$/;

export const IsStudentId = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      message: '$property은(는) 학번이어야 합니다.',
    },
    validator: {
      validate: (value: unknown) => {
        return typeof value === 'string' && STUDENT_ID_REGEXP.test(value);
      },
    },
  });
};
