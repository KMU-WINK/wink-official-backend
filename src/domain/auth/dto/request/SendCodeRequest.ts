import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendCodeRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
