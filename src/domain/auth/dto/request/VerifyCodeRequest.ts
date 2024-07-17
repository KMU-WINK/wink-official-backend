import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class VerifyCodeRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  code: string;
}
