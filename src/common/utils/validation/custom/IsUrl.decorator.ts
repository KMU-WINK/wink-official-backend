import { registerDecorator } from 'class-validator';

const URL_REGEX =
  /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.\S{2,}|www\.[a-zA-Z0-9]+\.\S{2,})$/;

export const IsUrl = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: `$property는 URL 형식이 아닙니다.`,
    },
    validator: {
      validate(value: any) {
        if (typeof value !== 'string') {
          return false;
        }

        return URL_REGEX.test(value);
      },
    },
  });
};
