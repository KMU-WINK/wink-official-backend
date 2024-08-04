import { applyDecorators } from '@nestjs/common';

import { IsOptional } from 'class-validator';

export const CanEmpty = () => {
  return applyDecorators(IsOptional());
};
