import { WrongPasswordException } from '@wink/auth/exception';

import { UpdateMyInfoRequestDto, UpdateMyPasswordRequestDto } from '@wink/member/dto';
import { Member } from '@wink/member/schema';
import { MemberService } from '@wink/member/service';

import { S3Service } from '@wink/s3';

import { createRandomMember, createRandomMembers, mockMember } from '@wink/test-mock';

import * as bcrypt from 'bcrypt';
import { Readable } from 'stream';
import { v4 as uuid } from 'uuid';

describe('MemberService', () => {
  let memberService: MemberService;
  let avatarService: S3Service;

  let memoryMemberRepository: Member[];

  beforeAll(async () => {
    const mock = await mockMember();

    const { module } = mock;
    ({ memoryMemberRepository } = mock);

    memberService = module.get<MemberService>(MemberService);
    avatarService = module.get<S3Service>('S3_SERVICE_AVATAR');
  });

  afterEach(() => {
    jest.clearAllMocks();
    memoryMemberRepository.splice(0, memoryMemberRepository.length);
  });

  describe('getMembers', () => {
    const MEMBERS: Member[] = createRandomMembers(10).map((member) => ({
      ...member,
      approved: true,
    }));

    it('Empty members', async () => {
      // Given

      // When
      const result = memberService.getMembers();

      // Then
      await expect(result).resolves.toStrictEqual({ members: [] });
    });

    it('Has Members', async () => {
      // Given
      memoryMemberRepository.push(...MEMBERS);

      // When
      const result = memberService.getMembers();

      // Then
      await expect(result).resolves.toBeInstanceOf(Object);
    });
  });

  describe('updateMyInfo', () => {
    const DESCRIPTION = '**DESCRIPTION**';
    const GITHUB = '** GITHUB **';
    const INSTAGRAM = '** INSTAGRAM **';
    const BLOG = '** BLOG **';

    const MEMBER: Member = createRandomMember();
    MEMBER.description = 'DESCRIPTION';
    MEMBER.link.github = 'GITHUB';
    MEMBER.link.instagram = 'INSTAGRAM';
    MEMBER.link.blog = 'BLOG';

    const PARAMS: UpdateMyInfoRequestDto = {
      description: DESCRIPTION,
      github: GITHUB,
      instagram: INSTAGRAM,
      blog: BLOG,
    };

    it('Change only description', async () => {
      // Given
      const member = { ...MEMBER };

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyInfo(member, {
        ...PARAMS,
        github: null,
        instagram: null,
        blog: null,
      });

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].description).toBe(DESCRIPTION);
      expect(memoryMemberRepository[0].link.github).toBeNull();
      expect(memoryMemberRepository[0].link.instagram).toBeNull();
      expect(memoryMemberRepository[0].link.blog).toBeNull();
    });

    it('Change only github', async () => {
      // Given
      const member = { ...MEMBER };

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyInfo(member, {
        ...PARAMS,
        description: null,
        instagram: null,
        blog: null,
      });

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].description).toBeNull();
      expect(memoryMemberRepository[0].link.github).toBe(GITHUB);
      expect(memoryMemberRepository[0].link.instagram).toBeNull();
      expect(memoryMemberRepository[0].link.blog).toBeNull();
    });

    it('Change only instagram', async () => {
      // Given
      const member = { ...MEMBER };

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyInfo(member, {
        ...PARAMS,
        description: null,
        github: null,
        blog: null,
      });

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].description).toBeNull();
      expect(memoryMemberRepository[0].link.github).toBeNull();
      expect(memoryMemberRepository[0].link.instagram).toBe(INSTAGRAM);
      expect(memoryMemberRepository[0].link.blog).toBeNull();
    });

    it('Change only blog', async () => {
      // Given
      const member = { ...MEMBER };

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyInfo(member, {
        ...PARAMS,
        description: null,
        github: null,
        instagram: null,
      });

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].description).toBeNull();
      expect(memoryMemberRepository[0].link.github).toBeNull();
      expect(memoryMemberRepository[0].link.instagram).toBeNull();
      expect(memoryMemberRepository[0].link.blog).toBe(BLOG);
    });

    it('Change multiple', async () => {
      // Given
      const member = { ...MEMBER };

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyInfo(member, {
        ...PARAMS,
        github: null,
        blog: null,
      });

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].description).toBe(DESCRIPTION);
      expect(memoryMemberRepository[0].link.github).toBeNull();
      expect(memoryMemberRepository[0].link.instagram).toBe(INSTAGRAM);
      expect(memoryMemberRepository[0].link.blog).toBeNull();
    });
  });

  describe('updateMyPassword', () => {
    const PASSWORD = 'p4ssw0rd!';
    const NEW_PASSWORD = 'n3wp4ssw0rd!';

    const HASH = bcrypt.hashSync(PASSWORD, 10);
    const MEMBER = createRandomMember();
    MEMBER.password = HASH;

    const PARAM: UpdateMyPasswordRequestDto = {
      password: PASSWORD,
      newPassword: NEW_PASSWORD,
    };

    it('WrongPasswordException', async () => {
      // Given
      const member = { ...MEMBER };

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyPassword(member, {
        ...PARAM,
        password: 'wrong_password',
      });

      // Then
      await expect(result).rejects.toThrow(WrongPasswordException);
    });

    it('Change password', async () => {
      // Given
      const member = { ...MEMBER };

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyPassword(member, PARAM);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(await bcrypt.compare(NEW_PASSWORD, memoryMemberRepository[0].password)).toBeTruthy();
    });
  });

  describe('updateMyAvatar', () => {
    it('Change avatar (first time)', async () => {
      // Given
      const fileName = uuid();
      const fileUrl = `https://s3.amazonaws.com/${fileName}`;

      const file: Express.Multer.File = {
        originalname: fileName,
        fieldname: '',
        encoding: '',
        mimetype: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
        path: '',
        buffer: Buffer.from(''),
      };

      const member = createRandomMember();
      member.avatar = null;

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyAvatar(member, file);

      // Then
      await expect(result).resolves.toStrictEqual({ avatar: fileUrl });
      expect(memoryMemberRepository[0].avatar).toBe(fileUrl);
      expect(avatarService.delete).not.toHaveBeenCalled();
    });

    it('Change avatar  (not first time)', async () => {
      // Given
      const fileName = uuid();
      const fileUrl = `https://s3.amazonaws.com/${fileName}`;

      const file: Express.Multer.File = {
        originalname: fileName,
        fieldname: '',
        encoding: '',
        mimetype: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
        path: '',
        buffer: Buffer.from(''),
      };

      const previousFileUrl = `https://s3.amazonaws.com/${uuid()}`;

      const member = createRandomMember();
      member.avatar = previousFileUrl;

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyAvatar(member, file);

      // Then
      await expect(result).resolves.toStrictEqual({ avatar: fileUrl });
      expect(memoryMemberRepository[0].avatar).toBe(fileUrl);
      expect(avatarService.delete).toHaveBeenCalledWith(previousFileUrl);
    });
  });
});
