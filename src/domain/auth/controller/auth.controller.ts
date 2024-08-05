import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../service';
import { AuthAccount, ReqMember } from '../guard';
import {
  LoginRequestDto,
  LoginResponseDto,
  MyInfoResponseDto,
  RegisterRequestDto,
  SendCodeRequestDto,
  VerifyCodeRequestDto,
  VerifyCodeResponseDto,
} from '../dto';
import {
  AlreadyRegisteredByEmailException,
  AlreadyRegisteredByStudentIdException,
  InvalidVerifyCodeException,
  InvalidVerifyTokenException,
  MemberNotFoundException,
  UnauthorizedException,
  WrongPasswordException,
} from '../exception';

import { Member } from '../../member/schema';
import { NotApprovedMemberException } from '../../member/exception';

import { ApiCustomErrorResponse, ApiCustomResponse } from '../../../common/utils/swagger';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: '로그인' })
  @ApiProperty({ type: LoginRequestDto })
  @ApiCustomResponse({ type: LoginResponseDto, status: 200 })
  @ApiCustomErrorResponse([
    {
      description: '회원을 찾을 수 없음',
      error: MemberNotFoundException,
    },
    {
      description: '비밀번호가 틀림',
      error: WrongPasswordException,
    },
  ])
  async login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = request;

    const token = await this.authService.login(email, password);

    return { token };
  }

  @Post('/register')
  @HttpCode(201)
  @ApiOperation({ summary: '회원가입' })
  @ApiProperty({ type: RegisterRequestDto })
  @ApiCustomResponse({ status: 201 })
  @ApiCustomErrorResponse([
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
    {
      description: '승인되지 않은 계정',
      error: NotApprovedMemberException,
    },
  ])
  async register(@Body() request: RegisterRequestDto): Promise<void> {
    const { name, studentId, password, verifyToken } = request;

    await this.authService.register(name, studentId, password, verifyToken);
  }

  @Post('/register/code')
  @HttpCode(201)
  @ApiOperation({ summary: '인증코드 전송' })
  @ApiProperty({ type: SendCodeRequestDto })
  @ApiCustomResponse({ status: 201 })
  @ApiCustomErrorResponse([
    {
      description: '이미 가입된 이메일',
      error: AlreadyRegisteredByEmailException,
    },
  ])
  async sendCode(@Body() request: SendCodeRequestDto): Promise<void> {
    const { email } = request;

    await this.authService.sendCode(email);
  }

  @Post('/register/code/verify')
  @HttpCode(200)
  @ApiOperation({ summary: '인증 토큰 발급' })
  @ApiProperty({ type: VerifyCodeRequestDto })
  @ApiCustomResponse({ type: VerifyCodeResponseDto, status: 200 })
  @ApiCustomErrorResponse([
    {
      description: '잘못된 인증 코드',
      error: InvalidVerifyCodeException,
    },
  ])
  async verifyCode(@Body() request: VerifyCodeRequestDto): Promise<VerifyCodeResponseDto> {
    const { email, code } = request;

    const verifyToken = await this.authService.verifyCode(email, code);

    return { verifyToken };
  }

  @Get('/me')
  @HttpCode(200)
  @AuthAccount()
  @ApiOperation({ summary: '인증 토큰으로 정보 조회' })
  @ApiCustomResponse({ type: MyInfoResponseDto, status: 200 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
  ])
  async getMyInfo(@ReqMember() member: Member): Promise<MyInfoResponseDto> {
    return this.authService.myInfo(member);
  }
}