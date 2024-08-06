import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@wink/auth/service';
import { AuthAccount, AuthAccountException, ReqMember } from '@wink/auth/guard';
import {
  LoginRequestDto,
  LoginResponseDto,
  MyInfoResponseDto,
  RegisterRequestDto,
  SendCodeRequestDto,
  VerifyCodeRequestDto,
  VerifyCodeResponseDto,
} from '@wink/auth/dto';
import {
  AlreadyRegisteredByEmailException,
  AlreadyRegisteredByStudentIdException,
  InvalidVerifyCodeException,
  InvalidVerifyTokenException,
  MemberNotFoundException,
  WrongPasswordException,
} from '@wink/auth/exception';

import { Member } from '@wink/member/schema';
import { NotApprovedMemberException } from '@wink/member/exception';

import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '로그인' })
  @ApiProperty({ type: LoginRequestDto })
  @ApiCustomResponse({ type: LoginResponseDto, status: HttpStatus.OK })
  @ApiCustomErrorResponse([
    MemberNotFoundException,
    WrongPasswordException,
    NotApprovedMemberException,
  ])
  async login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(request);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '회원가입' })
  @ApiProperty({ type: RegisterRequestDto })
  @ApiCustomResponse({ status: HttpStatus.CREATED })
  @ApiCustomErrorResponse([
    InvalidVerifyTokenException,
    AlreadyRegisteredByEmailException,
    AlreadyRegisteredByStudentIdException,
  ])
  async register(@Body() request: RegisterRequestDto): Promise<void> {
    return this.authService.register(request);
  }

  @Post('/register/code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '인증코드 전송' })
  @ApiProperty({ type: SendCodeRequestDto })
  @ApiCustomResponse({ status: HttpStatus.OK })
  @ApiCustomErrorResponse([AlreadyRegisteredByEmailException])
  async sendCode(@Body() request: SendCodeRequestDto): Promise<void> {
    return this.authService.sendCode(request);
  }

  @Post('/register/code/verify')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '인증 토큰 발급' })
  @ApiProperty({ type: VerifyCodeRequestDto })
  @ApiCustomResponse({ type: VerifyCodeResponseDto, status: HttpStatus.CREATED })
  @ApiCustomErrorResponse([InvalidVerifyCodeException])
  async verifyCode(@Body() request: VerifyCodeRequestDto): Promise<VerifyCodeResponseDto> {
    return this.authService.verifyCode(request);
  }

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @AuthAccount()
  @ApiOperation({ summary: '인증 토큰으로 정보 조회' })
  @ApiCustomResponse({ type: MyInfoResponseDto, status: HttpStatus.OK })
  @ApiCustomErrorResponse([...AuthAccountException])
  getMyInfo(@ReqMember() member: Member): MyInfoResponseDto {
    return this.authService.myInfo(member);
  }
}
