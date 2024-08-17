import { ApiProperty } from '@nestjs/swagger';

export class RefreshResponseDto {
  @ApiProperty({
    description: 'Access Token',
    example: 'A.B.C',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'Refresh Token',
    example: 'A.B.C',
  })
  refreshToken!: string;
}
