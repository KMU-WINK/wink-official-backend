import { registerDecorator } from 'class-validator';

const GITHUB_URL_REGEX = /^https?:\/\/(www\.)?github\.com\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export const IsGithubUrl = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property은(는) Github URL 형식이어야 합니다.',
    },
    validator: {
      validate(value: unknown) {
        return typeof value === 'string' && GITHUB_URL_REGEX.test(value);
      },
    },
  });
};
