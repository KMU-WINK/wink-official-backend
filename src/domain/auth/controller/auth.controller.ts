import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import {
  LoginRequestDto,
  LoginResponseDto,
  MyInfoResponseDto,
  RefreshRequestDto,
  RefreshResponseDto,
  RegisterRequestDto,
  SendCodeRequestDto,
  VerifyCodeRequestDto,
  VerifyCodeResponseDto,
} from '@wink/auth/dto';
import {
  AlreadyRegisteredByEmailException,
  AlreadyRegisteredByStudentIdException,
  InvalidRefreshTokenException,
  InvalidVerifyCodeException,
  InvalidVerifyTokenException,
  MemberNotFoundException,
  WrongPasswordException,
} from '@wink/auth/exception';
import { AuthAccount, AuthAccountException, ReqMember } from '@wink/auth/guard';
import { AuthService } from '@wink/auth/service';

import { NotApprovedMemberException } from '@wink/member/exception';
import { Member } from '@wink/member/schema';

import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  @ApiProperty({ type: LoginRequestDto })
  @ApiCustomResponse(LoginResponseDto)
  @ApiCustomErrorResponse([
    MemberNotFoundException,
    WrongPasswordException,
    NotApprovedMemberException,
  ])
  async login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(request);
  }

  @Post('/refresh')
  @ApiOperation({ summary: '토큰 재발행' })
  @ApiProperty({ type: RefreshRequestDto })
  @ApiCustomResponse(RefreshResponseDto)
  @ApiCustomErrorResponse([InvalidRefreshTokenException, MemberNotFoundException])
  async refresh(@Body() request: RefreshRequestDto): Promise<RefreshResponseDto> {
    return this.authService.refresh(request);
  }

  @Post('/register')
  @ApiOperation({ summary: '회원가입' })
  @ApiProperty({ type: RegisterRequestDto })
  @ApiCustomResponse()
  @ApiCustomErrorResponse([
    InvalidVerifyTokenException,
    AlreadyRegisteredByEmailException,
    AlreadyRegisteredByStudentIdException,
  ])
  async register(@Body() request: RegisterRequestDto): Promise<void> {
    return this.authService.register(request);
  }

  @Post('/register/code')
  @ApiOperation({ summary: '인증코드 전송' })
  @ApiProperty({ type: SendCodeRequestDto })
  @ApiCustomResponse()
  @ApiCustomErrorResponse([AlreadyRegisteredByEmailException])
  async sendCode(@Body() request: SendCodeRequestDto): Promise<void> {
    return this.authService.sendCode(request);
  }

  @Post('/register/code/verify')
  @ApiOperation({ summary: '인증 토큰 발급' })
  @ApiProperty({ type: VerifyCodeRequestDto })
  @ApiCustomResponse(VerifyCodeResponseDto)
  @ApiCustomErrorResponse([InvalidVerifyCodeException])
  async verifyCode(@Body() request: VerifyCodeRequestDto): Promise<VerifyCodeResponseDto> {
    return this.authService.verifyCode(request);
  }

  @Get('/me')
  @AuthAccount()
  @ApiOperation({ summary: '인증 토큰으로 정보 조회' })
  @ApiCustomResponse(MyInfoResponseDto)
  @ApiCustomErrorResponse([...AuthAccountException])
  getMyInfo(@ReqMember() member: Member): MyInfoResponseDto {
    return this.authService.myInfo(member);
  }
}
