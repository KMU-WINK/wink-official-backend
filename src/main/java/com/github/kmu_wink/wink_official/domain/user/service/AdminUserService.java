package com.github.kmu_wink.wink_official.domain.user.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.common.email.EmailSender;
import com.github.kmu_wink.wink_official.domain.user.dto.request.InviteRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.request.RemovePreUserRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.request.UpdateRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.response.AdminPreUsersResponse;
import com.github.kmu_wink.wink_official.domain.user.dto.response.AdminUsersResponse;
import com.github.kmu_wink.wink_official.domain.user.email.InviteTemplate;
import com.github.kmu_wink.wink_official.domain.user.exception.AlreadyApplicationException;
import com.github.kmu_wink.wink_official.domain.user.exception.UserNotFoundException;
import com.github.kmu_wink.wink_official.domain.user.repository.PreUserRepository;
import com.github.kmu_wink.wink_official.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official.domain.user.schema.PreUser;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;
    private final PreUserRepository preUserRepository;

    private final EmailSender emailSender;

    public AdminUsersResponse getUsers(int page, String query) {

        PageRequest pageRequest = PageRequest.of(page, 20, Sort.by("name").ascending());
        Page<User> users = userRepository.findAllByNameRegexOrStudentIdRegexOrEmailRegexOrPhoneNumberRegex(query, query, query, query, pageRequest);

        return AdminUsersResponse.builder()
                .users(users)
                .build();
    }

    public AdminPreUsersResponse getPreUsers(int page, String query) {

        PageRequest pageRequest = PageRequest.of(page, 20, Sort.by("name").ascending());
        Page<PreUser> users = preUserRepository.findAllByNameRegexOrStudentIdRegexOrEmailRegexOrPhoneNumberRegex(query, query, query, query, pageRequest);

        return AdminPreUsersResponse.builder()
                .users(users)
                .build();
    }

    public void invite(InviteRequest dto) {

        if (userRepository.findByStudentId(dto.studentId()).isPresent()
                || userRepository.findByEmail(dto.email()).isPresent()
                || userRepository.findByPhoneNumber(dto.phoneNumber()).isPresent()
                || preUserRepository.findByStudentId(dto.studentId()).isPresent()
                || preUserRepository.findByEmail(dto.email()).isPresent()
                || preUserRepository.findByPhoneNumber(dto.phoneNumber()).isPresent()) {

            throw new AlreadyApplicationException();
        }

        PreUser preUser = PreUser.builder()
                .name(dto.name())
                .studentId(dto.studentId())
                .email(dto.email())
                .phoneNumber(dto.phoneNumber())
                .token(UUID.randomUUID().toString())
                .build();

        preUserRepository.save(preUser);

        emailSender.send(dto.email(), InviteTemplate.of(preUser));
    }

    public void removePreUser(RemovePreUserRequest dto) {

        PreUser preUser = preUserRepository.findById(dto.id()).orElseThrow(UserNotFoundException::new);

        preUserRepository.delete(preUser);
    }

    public void update(UpdateRequest dto) {

        User user = userRepository.findById(dto.id()).orElseThrow(UserNotFoundException::new);

        user.setName(dto.name());
        user.setStudentId(dto.studentId());
        user.setEmail(dto.email());
        user.setPhoneNumber(dto.phoneNumber());

        user.setDescription(dto.description());
        user.getSocial().setGithub(dto.github());
        user.getSocial().setInstagram(dto.instagram());
        user.getSocial().setBlog(dto.blog());

        user.setActive(dto.active());

        userRepository.save(user);
    }
}
