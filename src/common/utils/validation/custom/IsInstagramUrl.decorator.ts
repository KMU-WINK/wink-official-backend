import { applyDecorators } from '@nestjs/common';

import { IsInstagramUrlFormat } from './format/IsInstagramUrlFormat.decorator';

import { NotEmpty } from './NotEmpty.decorator';

export const IsInstagramUrl = () => {
  return applyDecorators(IsInstagramUrlFormat(), NotEmpty());
};
