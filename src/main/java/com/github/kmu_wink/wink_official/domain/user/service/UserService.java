package com.github.kmu_wink.wink_official.domain.user.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.common.external.aws.s3.S3Service;
import com.github.kmu_wink.wink_official.common.property.AwsProperty;
import com.github.kmu_wink.wink_official.common.security.authentication.UserAuthentication;
import com.github.kmu_wink.wink_official.domain.user.dto.internal.NotionDbUser;
import com.github.kmu_wink.wink_official.domain.user.dto.request.UpdateMyInfoRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.request.UpdateMyPasswordRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.response.UpdateMyAvatarResponse;
import com.github.kmu_wink.wink_official.domain.user.dto.response.UserResponse;
import com.github.kmu_wink.wink_official.domain.user.dto.response.UsersResponse;
import com.github.kmu_wink.wink_official.domain.user.exception.UserNotFoundException;
import com.github.kmu_wink.wink_official.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import kong.unirest.core.json.JSONObject;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final MongoTemplate mongoTemplate;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;

    private final AwsProperty awsProperty;
    private final S3Service s3Service;

    public UsersResponse getUsers() {

        List<User> users = userRepository.findAllWithMask(mongoTemplate);

        return UsersResponse.builder()
                .users(users)
                .build();
    }

    public UserResponse updateMyInfo(User user, UpdateMyInfoRequest dto) {

        user.setDescription(dto.description());
        user.getSocial().setGithub(dto.github());
        user.getSocial().setInstagram(dto.instagram());
        user.getSocial().setBlog(dto.blog());

        user = userRepository.save(user);

        return UserResponse.builder()
            .user(user)
            .build();
    }

    public UpdateMyAvatarResponse updateMyAvatar(User user) {

        String url = s3Service.generatePresignedUrl("avatar/original/%s".formatted(user.getId()));

        return UpdateMyAvatarResponse.builder()
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

    public void awsCallback(String userId) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        String bucket = awsProperty.getS3().getBucket();
        String region = awsProperty.getRegion();

        user.setAvatar("https://%s.s3.%s.amazonaws.com/avatar/%s.webp".formatted(bucket, region, userId));

        userRepository.save(user);
    }

    public void notionCallback(Map<?, ?> body) {

        NotionDbUser notionDbUser = NotionDbUser.from(new JSONObject(body).getJSONObject("data")).orElseThrow();
        User user = userRepository.findById(notionDbUser.id()).orElseThrow();

        user.setName(notionDbUser.name());
        user.setStudentId(notionDbUser.studentId());
        user.setEmail(notionDbUser.email());
        user.setPhoneNumber(notionDbUser.phoneNumber());
        user.setRole(notionDbUser.role());
        user.setFee(notionDbUser.fee());

        userRepository.save(user);
    }
}
