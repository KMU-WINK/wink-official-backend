import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
