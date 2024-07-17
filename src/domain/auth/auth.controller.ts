import { Body, Controller, Get, HttpCode, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ReqMember } from './auth.middleware';

import { Member } from '../member/member.schema';

import { LoginRequest } from './dto/request/LoginRequest';
import { LoginResponse } from './dto/response/LoginResponse';
import { RegisterRequest } from './dto/request/RegisterRequest';
import { SendCodeRequest } from './dto/request/SendCodeRequest';
import { VerifyCodeRequest } from './dto/request/VerifyCodeRequest';
import { VerifyCodeResponse } from './dto/response/VerifyCodeResponse';
import { MyInfoResponse } from './dto/response/MyInfoResponse';

import { ApiCustomResponse } from '../../utils/swagger/ApiCustomResponse.decorator';
import { ApiCustomErrorResponseDecorator } from '../../utils/swagger/ApiCustomErrorResponse.decorator';

import { MemberNotFoundException } from './exception/MemberNotFoundException';
import { WrongPasswordException } from './exception/WrongPasswordException';
import { InvalidVerifyTokenException } from './exception/InvalidVerifyTokenException';
import { AlreadyRegisteredByEmailException } from './exception/AlreadyRegisteredByEmailException';
import { AlreadyRegisteredByStudentIdException } from './exception/AlreadyRegisteredByStudentIdException';
import { InvalidVerifyCodeException } from './exception/InvalidVerifyCodeException';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: '로그인 테스트 !!' })
  @ApiProperty({ type: LoginRequest })
  @ApiCustomResponse({ type: LoginResponse, status: 200 })
  @ApiCustomErrorResponseDecorator([
    {
      description: '회원을 찾을 수 없음',
      error: MemberNotFoundException,
    },
    {
      description: '비밀번호가 틀림',
      error: WrongPasswordException,
    },
  ])
  async login(@Body() request: LoginRequest): Promise<LoginResponse> {
    const { email, password } = request;

    const token = await this.service.login(email, password);

    return { token };
  }

  @Put()
  @HttpCode(201)
  @ApiOperation({ summary: '회원가입' })
  @ApiProperty({ type: RegisterRequest })
  @ApiCustomResponse({ status: 201 })
  @ApiCustomErrorResponseDecorator([
    {
      description: '이메일 인증 토큰이 잘못됨',
      error: InvalidVerifyTokenException,
    },
    {
      description: '이미 가입된 이메일',
      error: AlreadyRegisteredByEmailException,
    },
    {
      description: '이미 가입된 학번',
      error: AlreadyRegisteredByStudentIdException,
    },
  ])
  async register(@Body() request: RegisterRequest): Promise<void> {
    const { name, studentId, password, verifyToken } = request;

    await this.service.register(name, studentId, password, verifyToken);
  }

  @Get('/code')
  @HttpCode(201)
  @ApiOperation({ summary: '인증코드 전송' })
  @ApiProperty({ type: SendCodeRequest })
  @ApiCustomResponse({ status: 201 })
  @ApiCustomErrorResponseDecorator([
    {
      description: '이미 가입된 이메일',
      error: AlreadyRegisteredByEmailException,
    },
  ])
  async sendCode(@Body() request: SendCodeRequest): Promise<void> {
    const { email } = request;

    await this.service.sendCode(email);
  }

  @Post('/code')
  @HttpCode(200)
  @ApiOperation({ summary: '인증 토큰 발급' })
  @ApiProperty({ type: VerifyCodeRequest })
  @ApiCustomResponse({ type: VerifyCodeResponse, status: 200 })
  @ApiCustomErrorResponseDecorator([
    {
      description: '잘못된 인증 코드',
      error: InvalidVerifyCodeException,
    },
  ])
  async verifyCode(@Body() request: VerifyCodeRequest): Promise<VerifyCodeResponse> {
    const { email, code } = request;

    const verifyToken = await this.service.verifyCode(email, code);

    return { verifyToken };
  }

  @Get('/me')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '인증 토큰으로 정보 조회' })
  @ApiBearerAuth()
  @ApiCustomResponse({ type: MyInfoResponse, status: 200 })
  async getMyInfo(@ReqMember() member: Member): Promise<MyInfoResponse> {
    const memberDoc = member['_doc'];
    const memberId = member['_id'];

    delete memberDoc['_id'];
    delete memberDoc['__v'];

    return { userId: memberId, ...memberDoc };
  }
}
