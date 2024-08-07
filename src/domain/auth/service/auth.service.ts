import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

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

import { NotApprovedMemberException } from '@wink/member/exception';
import { MemberRepository } from '@wink/member/repository';
import { Member, omitMember } from '@wink/member/schema';

import { RedisService } from '@wink/redis';
import { LoginEvent, RegisterEvent, SendCodeEvent, VerifyCodeEvent } from '@wink/event';
import { MailService, RegisterCompleteTemplate, VerifyCodeTemplate } from '@wink/mail';

import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly memberRepository: MemberRepository,
    @Inject(`${RedisService.name}-code`) private readonly redisCodeRepository: RedisService,
    @Inject(`${RedisService.name}-token`) private readonly redisTokenRepository: RedisService,

    private readonly eventEmitter: EventEmitter2,
    private readonly mailService: MailService,
  ) {}

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

    const token = await this.jwtService.signAsync({ id: member._id });

    this.eventEmitter.emit(LoginEvent.EVENT_NAME, new LoginEvent(member));

    return { token };
  }

  async register({ name, studentId, password, verifyToken }: RegisterRequestDto): Promise<void> {
    const email = await this.redisTokenRepository.get(verifyToken);

    if (!email) {
      throw new InvalidVerifyTokenException();
    }

    if (await this.memberRepository.existsByEmail(email)) {
      throw new AlreadyRegisteredByEmailException();
    }

    if (await this.memberRepository.existsByStudentId(studentId)) {
      throw new AlreadyRegisteredByStudentIdException();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const member = await this.memberRepository.save({ name, studentId, email, password: hash });

    await this.redisTokenRepository.delete(verifyToken);

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

    await this.redisCodeRepository.ttl(email, code, 60 * 10);

    this.mailService.sendTemplate(email, new VerifyCodeTemplate(email, code)).then((_) => _);

    this.eventEmitter.emit(SendCodeEvent.EVENT_NAME, new SendCodeEvent(email, code));
  }

  async verifyCode({ email, code }: VerifyCodeRequestDto): Promise<VerifyCodeResponseDto> {
    const storedCode = await this.redisCodeRepository.get(email);

    if (storedCode !== code) {
      throw new InvalidVerifyCodeException();
    }

    await this.redisCodeRepository.delete(email);

    const verifyToken = uuid();
    await this.redisTokenRepository.ttl(verifyToken, email, 60 * 60);

    this.eventEmitter.emit(VerifyCodeEvent.EVENT_NAME, new VerifyCodeEvent(email, verifyToken));

    return { verifyToken };
  }

  myInfo(member: Member): MyInfoResponseDto {
    return <MyInfoResponseDto>omitMember(member, ['approved']);
  }
}
