import { ApiProperty } from '@nestjs/swagger';

import {
  IsName,
  IsPassword,
  IsStudentId,
  IsUUID,
  NotEmpty,
} from '../../../../common/utils/validation';

export class RegisterRequestDto {
  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  @IsName()
  name: string;

  @ApiProperty({
    description: '학번',
    example: 20240001,
  })
  @IsStudentId()
  studentId: number;

  @ApiProperty({
    description: '비밀번호',
    example: 'p4sSw0rd!',
  })
  @IsPassword()
  password: string;

  @ApiProperty({
    description: '인증 토큰',
    example: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  })
  @NotEmpty()
  @IsUUID()
  verifyToken: string;
}
