import { ApiProperty } from '@nestjs/swagger';

export class GetMembersForAdminPageResponseDto {
  @ApiProperty({
    description: '최대 페이지',
    example: 1,
  })
  page!: number;
}
