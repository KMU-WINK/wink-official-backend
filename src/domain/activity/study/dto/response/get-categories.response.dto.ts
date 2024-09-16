import { ApiProperty } from '@nestjs/swagger';

export class EachGetCategoriesResponseDto {
  @ApiProperty({
    description: '카테고리 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  _id!: string;

  @ApiProperty({
    description: '카테고리 이름',
    example: 'React.js 스터디',
  })
  name!: string;

  @ApiProperty({
    description: '참여중인 스터디 수',
    example: 10,
  })
  dependencies!: number;
}

export class GetCategoriesResponseDto {
  @ApiProperty({
    description: '카테고리 목록',
    type: [EachGetCategoriesResponseDto],
    example: [
      {
        _id: '1a2b3c4d5e6f7a8b9c0d1e2f',
        name: 'React.js 스터디',
        dependencies: 10,
      },
    ],
  })
  categories!: EachGetCategoriesResponseDto[];
}
