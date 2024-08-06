import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

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

import { MemberRepository } from '../../member/repository';
import { Member, transferMember } from '../../member/schema';
import { NotApprovedMemberException } from '../../member/exception';

import { RedisService } from '../../../common/redis';
import {
  MailService,
  RegisterCompleteTemplate,
  VerifyCodeTemplate,
} from '../../../common/utils/mail';
import {
  LoginEvent,
  RegisterEvent,
  SendCodeEvent,
  VerifyCodeEvent,
} from '../../../common/utils/event';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberRepository: MemberRepository,
    @Inject(`${RedisService.name}-code`) private readonly redisCodeRepository: RedisService,
    @Inject(`${RedisService.name}-token`) private readonly redisTokenRepository: RedisService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    if (!(await this.memberRepository.existsByEmail(email))) {
      throw new MemberNotFoundException();
    }

    const member = <Member>await this.memberRepository.findByEmailWithPassword(email);
    const { _id, password: memberPassword, approved } = member;

    if (!(await bcrypt.compare(password, memberPassword))) {
      throw new WrongPasswordException();
    }

    if (!approved) {
      throw new NotApprovedMemberException();
    }

    const token = await this.jwtService.signAsync({ id: _id });

    this.eventEmitter.emit(LoginEvent.EVENT_NAME, new LoginEvent(member));

    return { token };
  }

  async register({ name, studentId, password, verifyToken }: RegisterRequestDto): Promise<void> {
    if (!(await this.redisTokenRepository.exists(verifyToken))) {
      throw new InvalidVerifyTokenException();
    }

    const email = <string>await this.redisTokenRepository.get(verifyToken);

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
    return <MyInfoResponseDto>transferMember(member, ['approved']);
  }
}
