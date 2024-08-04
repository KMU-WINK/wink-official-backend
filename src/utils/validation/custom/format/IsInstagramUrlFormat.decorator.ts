import { registerDecorator } from 'class-validator';

const INSTAGRAM_USERNAME_REGEX = /^(?!.*\.\.)(?!.*\.$)\w[\w.]{0,29}$/i;

export const IsInstagramUrlFormat = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property는 Instagram URL 형식이 아닙니다. (https://instagram.com/{username})',
    },
    constraints: [],
    validator: {
      validate(value: any) {
        if (typeof value !== 'string') {
          return false;
        }

        return (
          value.startsWith('https://instagram.com/') &&
          INSTAGRAM_USERNAME_REGEX.test(value.slice('https://instagram.com/'.length))
        );
      },
    },
  });
};
