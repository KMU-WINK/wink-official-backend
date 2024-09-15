import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ApiCustomResponseDto } from '../dto';

class EmptyResponse {}

export const ApiCustomResponse = (type?: Type<unknown>) => {
  type ??= EmptyResponse;

  return applyDecorators(
    ApiExtraModels(type, ApiCustomResponseDto),
    ApiResponse({
      status: HttpStatus.OK,
      description: '성공',
      content: {
        'application/json': {
          schema: {
            allOf: [
              {
                $ref: getSchemaPath(ApiCustomResponseDto),
              },
              {
                properties: {
                  content: { $ref: getSchemaPath(type) },
                },
              },
            ],
          },
        },
      },
    }),
  );
};
