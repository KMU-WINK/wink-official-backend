import { registerDecorator } from 'class-validator';

const STUDY_LINK_REGEXP = /^https:\/\/cs-kookmin-club\.tistory\.com\/\d+$/;

export const IsStudyLink = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property은(는) Kookmin Club Tistory URL 형식이어야 합니다.',
    },
    validator: {
      validate(value: unknown) {
        return typeof value === 'string' && STUDY_LINK_REGEXP.test(value);
      },
    },
  });
};
