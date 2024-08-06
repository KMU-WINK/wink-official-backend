import { applyDecorators } from '@nestjs/common';

import { IsOptional as IsOptionalDecorator } from 'class-validator';

export const IsOptional = () => applyDecorators(IsOptionalDecorator());
