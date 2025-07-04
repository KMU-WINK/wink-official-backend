package com.github.kmu_wink.wink_official_page.domain.user.__admin__.service;

import com.github.kmu_wink.wink_official_page.domain.auth.exception.AuthExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.request.InviteRequest;
import com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.request.UpdateRequest;
import com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.response.AdminPreUserResponse;
import com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.response.AdminPreUsersResponse;
import com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.response.AdminUsersResponse;
import com.github.kmu_wink.wink_official_page.domain.user.__admin__.util.email.InviteTemplate;
import com.github.kmu_wink.wink_official_page.domain.user.dto.response.UserResponse;
import com.github.kmu_wink.wink_official_page.domain.user.exception.UserExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.user.repository.PreUserRepository;
import com.github.kmu_wink.wink_official_page.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official_page.domain.user.schema.PreUser;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.global.module.email.EmailSender;
import com.github.kmu_wink.wink_official_page.global.util.RandomString;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;
    private final PreUserRepository preUserRepository;
    private final MongoTemplate mongoTemplate;
    private final EmailSender emailSender;

    public AdminUsersResponse getUsers(int page, String query) {

        PageRequest pageRequest = PageRequest.of(
                page,
                20,
                Sort.by(Sort.Order.desc("role"), Sort.Order.desc("fee"), Sort.Order.asc("name"))
        );
        Page<User> users = userRepository.findAllSearch(query, pageRequest, mongoTemplate);

        return AdminUsersResponse.builder().users(users).build();
    }

    public AdminPreUsersResponse getPreUsers(int page, String query) {

        PageRequest pageRequest = PageRequest.of(page, 20, Sort.by("name").ascending());
        Page<PreUser> users = preUserRepository.findAllSearch(query, pageRequest);

        return AdminPreUsersResponse.builder().users(users).build();
    }

    public AdminPreUserResponse invite(InviteRequest dto) {

        if (userRepository.findByStudentId(dto.studentId()).isPresent() ||
                userRepository.findByEmail(dto.email()).isPresent() ||
                userRepository.findByPhoneNumber(dto.phoneNumber()).isPresent() ||
                preUserRepository.findByStudentId(dto.studentId()).isPresent() ||
                preUserRepository.findByEmail(dto.email()).isPresent() ||
                preUserRepository.findByPhoneNumber(dto.phoneNumber()).isPresent()) {

            throw AuthExceptionCode.ALREADY_REGISTERED.toException();
        }

        PreUser preUser = PreUser.builder()
                .name(dto.name())
                .studentId(dto.studentId())
                .department(dto.department())
                .email(dto.email())
                .phoneNumber(dto.phoneNumber())
                .token(RandomString.generate(128))
                .test(false)
                .build();

        preUser = preUserRepository.save(preUser);
        emailSender.send(dto.email(), InviteTemplate.of(preUser));

        return AdminPreUserResponse.builder().user(preUser).build();
    }

    public void removePreUser(String id) {

        PreUser preUser = preUserRepository.findById(id).orElseThrow(UserExceptionCode.NOT_FOUND::toException);

        preUserRepository.delete(preUser);
    }

    public UserResponse update(String id, UpdateRequest dto) {

        User user = userRepository.findById(id).orElseThrow(UserExceptionCode.NOT_FOUND::toException);

        user.setName(dto.name());
        user.setStudentId(dto.studentId());
        user.setDepartment(dto.department());
        user.setEmail(dto.email());
        user.setPhoneNumber(dto.phoneNumber());
        user.setRole(dto.role());
        user.setFee(dto.fee());

        user = userRepository.save(user);

        return UserResponse.builder().user(user).build();
    }
}
