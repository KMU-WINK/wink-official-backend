import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, TypeValidation, StringValidation } from '@wink/validation';

export class RegisterRequestDto {
  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.MinLength(2)
  @StringValidation.MaxLength(5)
  @StringValidation.IsName()
  name!: string;

  @ApiProperty({
    description: '학번',
    example: '20240001',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @TypeValidation.IsNumberString()
  @StringValidation.Length(8)
  @StringValidation.IsStudentId()
  studentId!: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'p4sSw0rd!',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.MinLength(8)
  @StringValidation.IsPassword()
  password!: string;

  @ApiProperty({
    description: '인증 토큰',
    example: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsUUID()
  verifyToken!: string;
}
