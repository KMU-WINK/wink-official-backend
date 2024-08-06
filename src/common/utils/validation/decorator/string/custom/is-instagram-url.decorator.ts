import { registerDecorator } from 'class-validator';

const INSTAGRAM_URL_REGEX =
  /^https?:\/\/(www\.)?instagram\.com\/(?!.*\.\.)(?!.*\.$)\w[\w.]{0,29}$/i;

export const IsInstagramUrl = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property은(는) Instagram URL 형식이어야 합니다.',
    },
    validator: {
      validate(value: unknown) {
        return typeof value === 'string' && INSTAGRAM_URL_REGEX.test(value);
      },
    },
  });
};
