import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, TypeValidation, StringValidation } from '@wink/validation';

export class CreateStudyRequestDto {
  @ApiProperty({
    description: '스터디 링크',
    example: 'https://cs-kookmin-club.tistory.com/000',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsStudyLink()
  link!: string;
}
