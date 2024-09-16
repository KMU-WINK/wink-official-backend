import { ApiProperty } from '@nestjs/swagger';

export class EachGetWaitingMembersResponseDto {
  @ApiProperty({
    description: '멤버 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  _id!: string;

  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  name!: string;

  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  email!: string;

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
