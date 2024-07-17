import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class RegisterRequest {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(2000_0001)
  @Max(2100_9999)
  studentId: number;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  verifyToken: string;
}
