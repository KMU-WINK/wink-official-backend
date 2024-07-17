import { ApiProperty } from '@nestjs/swagger';

export class VerifyCodeResponse {
  @ApiProperty({
    description: '인증 토큰',
    example: 'aaaa-bbbb-cccc-dddd',
  })
  verifyToken: string;
}
