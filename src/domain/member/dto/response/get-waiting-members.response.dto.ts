import { ApiProperty } from '@nestjs/swagger';

export class EachGetWaitingMembersResponseDto {
  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  name!: string;

  @ApiProperty({
    description: '학번',
    example: '20240001',
  })
  studentId!: string;
}

export class GetWaitingMembersResponseDto {
  @ApiProperty({
    description: '회원가입 승인 대기 목록',
    type: [EachGetWaitingMembersResponseDto],
  })
  members!: EachGetWaitingMembersResponseDto[];
}
