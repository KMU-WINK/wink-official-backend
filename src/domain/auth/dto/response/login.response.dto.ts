import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT 토큰',
    example: 'A.B.C',
  })
  token!: string;
}
