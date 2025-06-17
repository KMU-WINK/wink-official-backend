package com.github.kmu_wink.wink_official_page.domain.user.service;

import com.github.kmu_wink.wink_official_page.domain.program.upload.dto.response.UploadImageResponse;
import com.github.kmu_wink.wink_official_page.domain.user.dto.request.UpdateMyInfoRequest;
import com.github.kmu_wink.wink_official_page.domain.user.dto.request.UpdateMyPasswordRequest;
import com.github.kmu_wink.wink_official_page.domain.user.dto.response.UserResponse;
import com.github.kmu_wink.wink_official_page.domain.user.dto.response.UsersResponse;
import com.github.kmu_wink.wink_official_page.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.global.infra.s3.S3Service;
import com.github.kmu_wink.wink_official_page.global.security.authentication.UserAuthentication;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final MongoTemplate mongoTemplate;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;

    private final S3Service s3Service;

    public UsersResponse getUsers() {

        List<User> users = userRepository.findAllWithMask(mongoTemplate);

        return UsersResponse.builder()
                .users(users)
                .build();
    }

    public UserResponse updateMyInfo(User user, UpdateMyInfoRequest dto) {

        user.setAvatar(dto.avatar());
        user.setDescription(dto.description());
        user.getSocial().setGithub(dto.github());
        user.getSocial().setInstagram(dto.instagram());
        user.getSocial().setBlog(dto.blog());

        user = userRepository.save(user);

        return UserResponse.builder()
            .user(user)
            .build();
    }

    public UploadImageResponse uploadMyAvatar() {

        String url = s3Service.generatePresignedUrl("avatar/%s".formatted(UUID.randomUUID()));

        return UploadImageResponse.builder()
                .url(url)
                .build();
    }

    public UserResponse deleteMyAvatar(User user) {

        if (user.getAvatar() == null) {
            return UserResponse.builder()
                .user(user)
                .build();
        }

        s3Service.deleteFile("avatar/%s.webp".formatted(user.getId()));

        user.setAvatar(null);

        user = userRepository.save(user);

        return UserResponse.builder()
            .user(user)
            .build();
    }

    public void updateMyPassword(User user, UpdateMyPasswordRequest dto) {

        UserAuthentication authentication = new UserAuthentication(user, dto.password());
        authenticationManager.authenticate(authentication);

        user.setPassword(encoder.encode(dto.newPassword()));

        userRepository.save(user);
    }
}
