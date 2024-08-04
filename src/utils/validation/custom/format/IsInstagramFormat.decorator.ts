import { registerDecorator } from 'class-validator';

const INSTAGRAM_REGEX = /^(?!.*\.\.)(?!.*\.$)\w[\w.]{0,29}$/i;

export const IsInstagramFormat = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: {
      message: '$property는 Instagram 아이디 형식이 아닙니다.',
    },
    constraints: [],
    validator: {
      validate(value: any) {
        if (typeof value !== 'string') {
          return false;
        }

        return INSTAGRAM_REGEX.test(value);
      },
    },
  });
};
