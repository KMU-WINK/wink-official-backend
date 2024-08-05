import { Member } from '../../src/domain/member/schema';
import { mockMember } from './member.mock';
import { MemberService } from '../../src/domain/member/service';
import { generateMember, generateMembers } from './fake-members.mock';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

describe('Member Service Test', () => {
  let memberService: MemberService;

  let memoryMemberRepository: Member[];

  beforeAll(async () => {
    const mock = await mockMember();

    const { module } = mock;
    ({ memoryMemberRepository } = mock);

    memberService = module.get<MemberService>(MemberService);
  });

  afterEach(() => {
    memoryMemberRepository.splice(0, memoryMemberRepository.length);
  });

  describe('부원 조회', () => {
    it('부원 X', async () => {
      // Given

      // When
      const result = memberService.getMembers();

      // Then
      await expect(result).resolves.toStrictEqual([]);
    });

    it('부원 (10명)', async () => {
      // Given
      memoryMemberRepository.push(...generateMembers(10));

      // When
      const result = memberService.getMembers();

      // Then
      await expect(result).resolves.toHaveLength(10);
    });
  });

  describe('내 정보 수정', () => {
    it('한 줄 소개만 수정', async () => {
      // Given
      const description = '**DESCRIPTION**';

      const member = generateMember();

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

    it('Github URL만 수정', async () => {
      // Given
      const github = 'https://github.com/honggildong';

      const member = generateMember();

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

    it('Instagram URL만 수정', async () => {
      // Given
      const instagram = 'https://instagram.com/honggildong';

      const member = generateMember();

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

    it('Blog URL만 수정', async () => {
      // Given
      const blog = 'https://honggildong.tistory.com';

      const member = generateMember();

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

    it('종합 수정', async () => {
      // Given
      const description = '**DESCRIPTION**';
      const instagram = 'https://instagram.com/honggildong2';

      const member = generateMember();
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

  describe('내 비밀번호 수정', () => {
    it('비밀번호 수정', async () => {
      // Given
      const password = 'p4ssw0rd!';
      const newPassword = 'n3wp4ssw0rd!';

      const member = generateMember();
      member.password = await bcrypt.hash(password, 10);

      memoryMemberRepository.push(member);

      // When
      const result = memberService.updateMyPassword(member, password, newPassword);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(await bcrypt.compare(newPassword, memoryMemberRepository[0].password)).toBeTruthy();
    });
  });

  describe('내 프로필 사진 수정', () => {
    it('프로필 사진 수정', async () => {
      // Given
      const fileName = uuid();

      const member = generateMember();

      // When
      const result = memberService.updateMyAvatar(member, {
        originalname: fileName,
      } as Express.Multer.File);

      // Then
      await expect(result).resolves.toBe(`https://s3.amazonaws.com/${fileName}`);
    });
  });
});
