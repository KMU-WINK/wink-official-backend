import { IsNotEmpty, IsNumber, Length, Matches, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @IsNotEmpty({ message: '이름은 필수 입력 값입니다.' })
  @Length(2, 10, { message: '이름은 2글자 이상 10글자 이하로 입력해주세요.' })
  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  name: string;

  @IsNumber({}, { message: '올바른 학번이 아닙니다.' })
  @Min(2000_0001, { message: '올바른 학번이 아닙니다.' })
  @Max(2100_9999, { message: '올바른 학번이 아닙니다.' })
  @ApiProperty({
    description: '학번',
    example: 20240001,
  })
  studentId: number;

  @IsNotEmpty({ message: '이메일은 필수 입력 값입니다.' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,24}$/, {
    message: '비밀번호는 8글자 이상 24글자 이하의 영어 대소문자와 숫자로 입력해주세요.',
  })
  @ApiProperty({
    description: '비밀번호',
    example: 'p4sSw0rd!',
  })
  password: string;

  @IsNotEmpty({ message: '인증 토큰은 필수 입력 값입니다.' })
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    message: '올바른 인증 토큰이 아닙니다.',
  })
  @ApiProperty({
    description: '인증 토큰',
    example: 'aaaa-bbbb-cccc-dddd',
  })
  verifyToken: string;
}
