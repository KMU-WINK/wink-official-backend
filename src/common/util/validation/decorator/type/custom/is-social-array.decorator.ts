import { registerDecorator } from 'class-validator';

export const IsSocialArray = () => (object: NonNullable<unknown>, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      message: '$property은(는) 친목 활동 배열이어야 합니다.',
    },
    validator: {
      validate: (value: unknown) => {
        return (
          Array.isArray(value) &&
          value.every(
            (v) =>
              typeof v === 'object' && typeof v.content === 'string' && typeof v.image === 'string',
          )
        );
      },
    },
  });
};
