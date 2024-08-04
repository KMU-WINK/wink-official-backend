import { applyDecorators } from '@nestjs/common';

import { IsStudentIdFormat } from './format/IsStudentIdFormat.decorator';

import { IsNumber } from './IsNumber.decorator';

export const IsStudentId = () => {
  return applyDecorators(IsStudentIdFormat(), IsNumber());
};
