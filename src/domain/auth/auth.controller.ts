/* eslint-disable @typescript-eslint/no-unused-vars */
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

    // this.service.login(email, password);

    throw new HttpException('Not implemented', 501);
  }

  @Put()
  async register(@Body() request: RegisterRequest): Promise<void> {
    const { name, studentId, verifyToken, password } = request;

    // this.service.register(studentId, email, password, verifyToken);

    throw new HttpException('Not implemented', 501);
  }

  @Get('/code')
  async sendCode(@Body() request: SendCodeRequest): Promise<void> {
    const { email } = request;

    // this.service.sendCode(email);

    throw new HttpException('Not implemented', 501);
  }

  @Post('/code')
  async verifyCode(@Body() request: VerifyCodeRequest): Promise<VerifyCodeResponse> {
    const { email, code } = request;

    // this.service.verifyCode(email, code);

    throw new HttpException('Not implemented', 501);
  }

  @Get('/me')
  async getMyInfo(): Promise<MyInfoResponse> {
    throw new HttpException('Not implemented', 501);
  }
}
