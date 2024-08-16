import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ApiCustomResponseDto {
  @ApiProperty({ type: Number, description: 'HTTP 응답 코드', default: HttpStatus.OK })
  code!: number;

  @ApiProperty({ type: Boolean, description: '오류 여부', default: false })
  error!: boolean;

  @ApiProperty({
    type: 'object',
    description: '응답 데이터',
  })
  content: unknown;
}
