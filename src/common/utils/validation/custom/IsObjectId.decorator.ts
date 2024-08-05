import { applyDecorators } from '@nestjs/common';

import { IsObjectIdFormat } from './format/IsObjectIdFormat.decorator';

import { NotEmpty } from './NotEmpty.decorator';

export const IsObjectId = () => {
  return applyDecorators(IsObjectIdFormat(), NotEmpty());
};
