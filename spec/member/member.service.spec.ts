import { mockMember } from './member.mock';
import { createRandomMember, createRandomMembers } from './fake-members.mock';

import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Readable } from 'stream';

import { MemberService } from '../../src/domain/member/service';
import { Member } from '../../src/domain/member/schema';

import { WrongPasswordException } from '../../src/domain/auth/exception';

import { S3Service } from '../../src/common/s3';

describe('MemberService', () => {
  let memberService: MemberService;
  let s3AvatarService: S3Service;

  let memoryMemberRepository: Member[];

  beforeAll(async () => {
    const mock = await mockMember();

    const { module } = mock;
    ({ memoryMemberRepository } = mock);

    memberService = module.get<MemberService>(MemberService);
    s3AvatarService = module.get<S3Service>(`${S3Service}-avatar`);
  });

  afterEach(() => {
    jest.clearAllMocks();
    memoryMemberRepository.splice(0, memoryMemberRepository.length);
  });

  describe('getMembers', () => {
    it('Empty members', async () => {
      // Given

      // When
      const result = memberService.getMembers();

      // Then
      await expect(result).resolves.toStrictEqual([]);
    });

    it('Has Members', async () => {
      // Given
      memoryMemberRepository.push(...createRandomMembers(10));

      // When
      const result = memberService.getMembers();

      // Then
      await expect(result).resolves.toHaveLength(10);
    });
  });

  describe('updateMyInfo', () => {
    it('Change only description', async () => {
      // Given
      const description = '**DESCRIPTION**';

      const member = createRandomMember();

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyInfo(member, description, null, null, null);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].description).toBe(description);
      expect(memoryMemberRepository[0].link.github).toBeNull();
      expect(memoryMemberRepository[0].link.instagram).toBeNull();
      expect(memoryMemberRepository[0].link.blog).toBeNull();
    });

    it('Change only github', async () => {
      // Given
      const github = 'https://github.com/honggildong';

      const member = createRandomMember();

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyInfo(member, null, github, null, null);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].description).toBeNull();
      expect(memoryMemberRepository[0].link.github).toBe(github);
      expect(memoryMemberRepository[0].link.instagram).toBeNull();
      expect(memoryMemberRepository[0].link.blog).toBeNull();
    });

    it('Change only instagram', async () => {
      // Given
      const instagram = 'https://instagram.com/honggildong';

      const member = createRandomMember();

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyInfo(member, null, null, instagram, null);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].description).toBeNull();
      expect(memoryMemberRepository[0].link.github).toBeNull();
      expect(memoryMemberRepository[0].link.instagram).toBe(instagram);
      expect(memoryMemberRepository[0].link.blog).toBeNull();
    });

    it('Change only blog', async () => {
      // Given
      const blog = 'https://honggildong.tistory.com';

      const member = createRandomMember();

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyInfo(member, null, null, null, blog);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].description).toBeNull();
      expect(memoryMemberRepository[0].link.github).toBeNull();
      expect(memoryMemberRepository[0].link.instagram).toBeNull();
      expect(memoryMemberRepository[0].link.blog).toBe(blog);
    });

    it('Change multiple', async () => {
      // Given
      const description = '**DESCRIPTION**';
      const instagram = 'https://instagram.com/honggildong2';

      const member = createRandomMember();
      member.description = 'DESCRIPTION';
      member.link.github = 'https://github.com/honggildong';
      member.link.instagram = 'https://instagram.com/honggildong';
      member.link.blog = 'https://honggildong.tistory.com';

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyInfo(member, description, null, instagram, null);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].description).toBe(description);
      expect(memoryMemberRepository[0].link.github).toBeNull();
      expect(memoryMemberRepository[0].link.instagram).toBe(instagram);
      expect(memoryMemberRepository[0].link.blog).toBeNull();
    });
  });

  describe('updateMyPassword', () => {
    it('WrongPasswordException', async () => {
      // Given
      const password = 'p4ssw0rd!';
      const newPassword = 'n3wp4ssw0rd!';

      const member = createRandomMember();
      member.password = await bcrypt.hash(password, 10);

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyPassword(member, `${password}!`, newPassword);

      // Then
      await expect(result).rejects.toThrow(WrongPasswordException);
    });

    it('Change password', async () => {
      // Given
      const password = 'p4ssw0rd!';
      const newPassword = 'n3wp4ssw0rd!';

      const member = createRandomMember();
      member.password = await bcrypt.hash(password, 10);

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyPassword(member, password, newPassword);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(await bcrypt.compare(newPassword, memoryMemberRepository[0].password)).toBeTruthy();
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
      await expect(result).resolves.toBe(fileUrl);
      expect(memoryMemberRepository[0].avatar).toBe(fileUrl);
      expect(s3AvatarService.delete).not.toHaveBeenCalled();
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
      await expect(result).resolves.toBe(fileUrl);
      expect(memoryMemberRepository[0].avatar).toBe(fileUrl);
      expect(s3AvatarService.delete).toHaveBeenCalledWith(previousFileUrl);
    });
  });
});
