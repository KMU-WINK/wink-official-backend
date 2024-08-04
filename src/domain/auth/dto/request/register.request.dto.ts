import { ApiProperty } from '@nestjs/swagger';

import { CustomValidation } from '../../../../utils';

export class RegisterRequestDto {
  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  @CustomValidation.IsName()
  name: string;

  @ApiProperty({
    description: '학번',
    example: 20240001,
  })
  @CustomValidation.IsStudentId()
  studentId: number;

  @ApiProperty({
    description: '비밀번호',
    example: 'p4sSw0rd!',
  })
  @CustomValidation.IsPassword()
  password: string;

  @ApiProperty({
    description: '인증 토큰',
    example: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  })
  @CustomValidation.NotEmpty()
  @CustomValidation.IsUUID()
  verifyToken: string;
}
