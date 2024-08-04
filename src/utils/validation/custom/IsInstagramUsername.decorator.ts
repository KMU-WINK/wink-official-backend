import { applyDecorators } from '@nestjs/common';

import { IsInstagramFormat } from './format/IsInstagramFormat.decorator';

import { NotEmpty } from './NotEmpty.decorator';

export const IsInstagramUsername = () => {
  return applyDecorators(IsInstagramFormat(), NotEmpty());
};
