package com.github.kmu_wink.wink_official.domain.user.service;

import com.github.kmu_wink.wink_official.common.property.AwsProperty;
import com.github.kmu_wink.wink_official.common.s3.S3Service;
import com.github.kmu_wink.wink_official.common.security.authentication.UserAuthentication;
import com.github.kmu_wink.wink_official.domain.user.dto.request.UpdateMyInfoRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.request.UpdateMyPasswordRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.response.UpdateMyAvatarResponse;
import com.github.kmu_wink.wink_official.domain.user.dto.response.UsersResponse;
import com.github.kmu_wink.wink_official.domain.user.exception.UserNotFoundException;
import com.github.kmu_wink.wink_official.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official.domain.user.schema.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;

    private final AwsProperty awsProperty;
    private final S3Service s3Service;

    public UsersResponse getUsers() {

        List<User> users = userRepository.findAllExcludingFee();

        return UsersResponse.builder()
                .users(users)
                .build();
    }

    public void updateMyInfo(User user, UpdateMyInfoRequest dto) {

        String description = dto.description();
        String github = dto.github();
        String instagram = dto.instagram();
        String blog = dto.blog();

        user.setDescription(description);
        user.getSocial().setGithub(github);
        user.getSocial().setInstagram(instagram);
        user.getSocial().setBlog(blog);

        userRepository.save(user);
    }

    public UpdateMyAvatarResponse updateMyAvatar(User user) {

        String url = s3Service.generatePresignedUrl("avatar/original/%s".formatted(user.getId()));

        return UpdateMyAvatarResponse.builder()
                .url(url)
                .build();
    }

    public void deleteMyAvatar(User user) {

        if (user.getAvatar() == null) {
            return;
        }

        s3Service.deleteFile("avatar/%s.jpg".formatted(user.getId()));

        user.setAvatar(null);

        userRepository.save(user);
    }

    public void updateMyPassword(User user, UpdateMyPasswordRequest dto) {

        String password = dto.password();
        String newPassword = dto.newPassword();

        UserAuthentication authentication = new UserAuthentication(user, password);
        authenticationManager.authenticate(authentication);

        user.setPassword(encoder.encode(newPassword));

        userRepository.save(user);
    }

    public void awsCallback(String userId) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        user.setAvatar("https://%s.s3.%s.amazonaws.com/avatar/%s.jpg".formatted(awsProperty.getS3().getBucket(), awsProperty.getRegion(), userId));

        userRepository.save(user);
    }
}
