import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @IsNotEmpty()
  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  name: string;

  @IsNumber()
  @Min(2000_0001)
  @Max(2100_9999)
  @ApiProperty({
    description: '학번',
    example: 20240001,
  })
  studentId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호',
    example: 'p4sSw0rd!',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '인증 토큰',
    example: 'aaaa-bbbb-cccc-dddd',
  })
  verifyToken: string;
}
