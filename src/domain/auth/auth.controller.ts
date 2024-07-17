import { Body, Controller, Get, HttpException, Post, Put } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginRequest } from './dto/request/LoginRequest';
import { LoginResponse } from './dto/response/LoginResponse';
import { RegisterRequest } from './dto/request/RegisterRequest';
import { SendCodeRequest } from './dto/request/SendCodeRequest';
import { VerifyCodeRequest } from './dto/request/VerifyCodeRequest';
import { VerifyCodeResponse } from './dto/response/VerifyCodeResponse';
import { MyInfoResponse } from './dto/response/MyInfoResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  async login(@Body() request: LoginRequest): Promise<LoginResponse> {
    const { email, password } = request;

    const token = await this.service.login(email, password);

    return { token };
  }

  @Put()
  async register(@Body() request: RegisterRequest): Promise<void> {
    const { name, studentId, password, verifyToken } = request;

    await this.service.register(name, studentId, password, verifyToken);
  }

  @Get('/code')
  async sendCode(@Body() request: SendCodeRequest): Promise<void> {
    const { email } = request;

    await this.service.sendCode(email);
  }

  @Post('/code')
  async verifyCode(@Body() request: VerifyCodeRequest): Promise<VerifyCodeResponse> {
    const { email, code } = request;

    const verifyToken = await this.service.verifyCode(email, code);

    return { verifyToken };
  }

  @Get('/me')
  async getMyInfo(): Promise<MyInfoResponse> {
    throw new HttpException('Not implemented', 501);
  }
}
