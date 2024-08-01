import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ApiCustomResponseDto } from '../dto';

interface ApiCustomResponseOptions {
  type?: Type<any>;
  status: HttpStatus;
}

class EmptyResponse {}

export const ApiCustomResponse = (options: ApiCustomResponseOptions) => {
  options.type ??= EmptyResponse;

  return applyDecorators(
    ApiExtraModels(options.type, ApiCustomResponseDto),
    ApiResponse({
      status: options.status,
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
                  data: { $ref: getSchemaPath(options.type) },
                },
              },
            ],
          },
        },
      },
    }),
  );
};
