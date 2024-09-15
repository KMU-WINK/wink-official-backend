import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

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

import { NotApprovedMemberException } from '@wink/member/exception';
import { MemberRepository } from '@wink/member/repository';
import { Member, omitMember } from '@wink/member/schema';

import { RedisService } from '@wink/redis';
import {
  LoginEvent,
  RefreshEvent,
  RegisterEvent,
  SendCodeEvent,
  VerifyCodeEvent,
} from '@wink/event';
import { MailService, RegisterCompleteTemplate, VerifyCodeTemplate } from '@wink/mail';

import { v4 as uuid } from 'uuid';
import ms, { StringValue } from 'ms';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly accessExpiresIn: string;
  private readonly refreshExpiresIn: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,

    private readonly memberRepository: MemberRepository,
    @Inject('REDIS_SERVICE_VERIFY_CODE') private readonly verifyCodeService: RedisService,
    @Inject('REDIS_SERVICE_VERIFY_TOKEN') private readonly verifyTokenService: RedisService,
    @Inject('REDIS_SERVICE_REFRESH_TOKEN') private readonly refreshTokenService: RedisService,

    private readonly eventEmitter: EventEmitter2,
    private readonly mailService: MailService,
  ) {
    this.accessExpiresIn = this.configService.getOrThrow<string>('jwt.expiresIn.access');
    this.refreshExpiresIn = this.configService.getOrThrow<string>('jwt.expiresIn.refresh');
  }

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    const member = await this.memberRepository.findByEmailWithPassword(email);

    if (!member) {
      throw new MemberNotFoundException();
    }

    if (!(await bcrypt.compare(password, member.password))) {
      throw new WrongPasswordException();
    }

    if (!member.approved) {
      throw new NotApprovedMemberException();
    }

    const accessToken = await this.jwtService.signAsync(
      { id: member._id },
      { expiresIn: this.accessExpiresIn },
    );

    const refreshToken = await this.jwtService.signAsync({}, { expiresIn: this.refreshExpiresIn });

    await this.refreshTokenService.set(
      refreshToken,
      member._id,
      ms(this.refreshExpiresIn as StringValue),
    );

    this.eventEmitter.emit(LoginEvent.EVENT_NAME, new LoginEvent(member));

    return { accessToken, refreshToken };
  }

  async refresh({ refreshToken }: RefreshRequestDto): Promise<RefreshResponseDto> {
    if (!(await this.refreshTokenService.exists(refreshToken))) {
      throw new InvalidRefreshTokenException();
    }

    const memberId = await this.refreshTokenService.get(refreshToken);
    await this.refreshTokenService.delete(refreshToken);

    const member = await this.memberRepository.findById(memberId);
    if (!member) {
      throw new MemberNotFoundException();
    }

    const newAccessToken = await this.jwtService.signAsync(
      { id: memberId },
      { expiresIn: this.accessExpiresIn },
    );

    const newRefreshToken = await this.jwtService.signAsync(
      {},
      { expiresIn: this.refreshExpiresIn },
    );

    await this.refreshTokenService.set(
      newRefreshToken,
      memberId,
      ms(this.refreshExpiresIn as StringValue),
    );

    this.eventEmitter.emit(RefreshEvent.EVENT_NAME, new RefreshEvent(member));

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async register({ name, studentId, password, verifyToken }: RegisterRequestDto): Promise<void> {
    if (!(await this.verifyTokenService.exists(verifyToken))) {
      throw new InvalidVerifyTokenException();
    }

    const email = await this.verifyTokenService.get(verifyToken);

    if (await this.memberRepository.existsByEmail(email)) {
      throw new AlreadyRegisteredByEmailException();
    }

    if (await this.memberRepository.existsByStudentId(studentId)) {
      throw new AlreadyRegisteredByStudentIdException();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const member = await this.memberRepository.save({ name, studentId, email, password: hash });

    await this.verifyTokenService.delete(verifyToken);

    this.mailService.sendTemplate(email, new RegisterCompleteTemplate(name)).then((_) => _);

    this.eventEmitter.emit(RegisterEvent.EVENT_NAME, new RegisterEvent(member));
  }

  async sendCode({ email }: SendCodeRequestDto): Promise<void> {
    if (await this.memberRepository.existsByEmail(email)) {
      throw new AlreadyRegisteredByEmailException();
    }

    const code = Math.floor(Math.random() * 1_000_000)
      .toString()
      .padStart(6, '0');

    await this.verifyCodeService.set(email, code, 60 * 10);

    this.mailService.sendTemplate(email, new VerifyCodeTemplate(email, code)).then((_) => _);

    this.eventEmitter.emit(SendCodeEvent.EVENT_NAME, new SendCodeEvent(email, code));
  }

  async verifyCode({ email, code }: VerifyCodeRequestDto): Promise<VerifyCodeResponseDto> {
    if (!(await this.verifyCodeService.exists(email))) {
      throw new InvalidVerifyCodeException();
    }

    const storedCode = await this.verifyCodeService.get(email);

    if (storedCode !== code) {
      throw new InvalidVerifyCodeException();
    }

    await this.verifyCodeService.delete(email);

    const verifyToken = uuid();
    await this.verifyTokenService.set(verifyToken, email, 60 * 60);

    this.eventEmitter.emit(VerifyCodeEvent.EVENT_NAME, new VerifyCodeEvent(email, verifyToken));

    return { verifyToken };
  }

  myInfo(member: Member): MyInfoResponseDto {
    return <MyInfoResponseDto>omitMember(member, ['approved']);
  }
}
