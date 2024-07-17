import { ApiExtraModels, ApiProperty, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';

export class ApiCustomResponseDto {
  @ApiProperty({ type: Boolean, description: '오류 여부', default: false })
  error: boolean;

  @ApiProperty({
    type: 'object',
    description: '응답 데이터',
  })
  data: any;
}

class EmptyResponse {}

interface ApiCustomResponseOptions {
  type?: Type<any>;
  status: HttpStatus;
}
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
