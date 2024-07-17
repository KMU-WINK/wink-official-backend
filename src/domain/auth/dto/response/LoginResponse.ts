import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    description: 'JWT 토큰',
    example: 'A.B.C',
  })
  token: string;
}
