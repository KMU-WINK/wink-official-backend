import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../service';
import { AuthAccount, AuthAccountException, ReqMember } from '../guard';
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
    MemberNotFoundException,
    WrongPasswordException,
    NotApprovedMemberException,
  ])
  async login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(request);
  }

  @Post('/register')
  @HttpCode(201)
  @ApiOperation({ summary: '회원가입' })
  @ApiProperty({ type: RegisterRequestDto })
  @ApiCustomResponse({ status: HttpStatus.CREATED })
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
  ])
  async register(@Body() request: RegisterRequestDto): Promise<void> {
    return this.authService.register(request);
  }

  @Post('/register/code')
  @HttpCode(HttpStatus.NO_CONTENT)
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
    return this.authService.sendCode(request);
  }

  @Post('/register/code/verify')
  @HttpCode(HttpStatus.OK)
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
    return this.authService.verifyCode(request);
  }

  @Get('/me')
  @HttpCode(200)
  @AuthAccount()
  @ApiOperation({ summary: '인증 토큰으로 정보 조회' })
  @ApiCustomResponse({ type: MyInfoResponseDto, status: 200 })
  @ApiCustomErrorResponse([...AuthAccountException])
  getMyInfo(@ReqMember() member: Member): MyInfoResponseDto {
    return this.authService.myInfo(member);
  }
}
