import { ApiProperty } from '@nestjs/swagger';

export class GetStudiesPageResponse {
  @ApiProperty({
    description: '최대 페이지',
    type: Number,
  })
  page!: number;
}
