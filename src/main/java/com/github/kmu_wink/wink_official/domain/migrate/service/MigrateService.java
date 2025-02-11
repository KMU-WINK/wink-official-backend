package com.github.kmu_wink.wink_official.domain.migrate.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.auth.exception.AlreadyRegisteredException;
import com.github.kmu_wink.wink_official.domain.migrate.dto.request.MigrateRequest;
import com.github.kmu_wink.wink_official.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official.domain.user.schema.User;
import com.github.kmu_wink.wink_official.domain.user.task.SyncNotionDbTask;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MigrateService {

	private final UserRepository userRepository;

	private final PasswordEncoder encoder;
	private final SyncNotionDbTask syncNotionDbTask;

	public void migrate(MigrateRequest dto) {

		if (userRepository.findByEmail(dto.email()).isPresent()
			|| userRepository.findByStudentId(dto.studentId()).isPresent()
			|| userRepository.findByPhoneNumber(dto.phoneNumber()).isPresent()) {

			throw new AlreadyRegisteredException();
		}

		User user = User.builder()
			.email(dto.email())
			.name(dto.name())
			.studentId(dto.studentId())
			.department(dto.department())
			.phoneNumber(dto.phoneNumber())
			.password(encoder.encode(dto.password()))
			.social(User.Social.builder().build())
			.role(User.Role.MEMBER)
			.fee(false)
			.build();

		userRepository.save(user);
		syncNotionDbTask.manual(user);
	}
}
