import { ApiProperty } from '@nestjs/swagger';

export class VerifyCodeResponse {
  @ApiProperty({
    description: '인증 토큰',
    example: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  })
  verifyToken: string;
}
