import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class UpdateMyPasswordRequestDto {
  @IsNotEmpty({ message: '비밀번호는 필수 입력 값입니다.' })
  @ApiProperty({
    description: '기존 비밀번호',
    example: 'p4ssw0rd!',
  })
  password?: string;

  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,24}$/, {
    message: '새 비밀번호는 8글자 이상 24글자 이하의 영어 대소문자와 숫자로 입력해주세요.',
  })
  @ApiProperty({
    description: '새 비밀번호',
    example: 'n3wp4ssw0rd!',
  })
  newPassword?: string;
}
