import { registerDecorator } from 'class-validator';

const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export const IsGithubUrlFormat = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property는 Github URL 형식이 아닙니다. (https://github.com/{username})',
    },
    constraints: [],
    validator: {
      validate(value: any) {
        if (typeof value !== 'string') {
          return false;
        }

        return (
          value.startsWith('https://github.com/') &&
          GITHUB_USERNAME_REGEX.test(value.slice('https://github.com/'.length))
        );
      },
    },
  });
};
