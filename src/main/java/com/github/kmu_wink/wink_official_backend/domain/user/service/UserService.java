package com.github.kmu_wink.wink_official_backend.domain.user.service;

import com.github.kmu_wink.wink_official_backend.common.s3.S3Service;
import com.github.kmu_wink.wink_official_backend.common.security.authentication.UserAuthentication;
import com.github.kmu_wink.wink_official_backend.common.util.ImageUtil;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.request.ChangeInfoRequest;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.request.ChangePasswordRequest;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.response.UserListResponse;
import com.github.kmu_wink.wink_official_backend.domain.user.exception.AvatarNotImageException;
import com.github.kmu_wink.wink_official_backend.domain.user.exception.AvatarSizeOverException;
import com.github.kmu_wink.wink_official_backend.domain.user.exception.AvatarSizeUnderException;
import com.github.kmu_wink.wink_official_backend.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final S3Service s3Service;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public UserListResponse getUserList() {

        List<User> users = userRepository.findAllByApprovedTrue(Sort.by(Sort.Order.asc("name")));

        return UserListResponse.builder()
                .users(users)
                .build();
    }

    public void changeInfo(User user, ChangeInfoRequest dto) {

        String description = dto.description();
        String github = dto.github();
        String instagram = dto.instagram();
        String blog = dto.blog();

        user.setDescription(description);

        User.Social social = user.getSocial();
        social.setGithub(github);
        social.setInstagram(instagram);
        social.setBlog(blog);
        user.setSocial(social);

        userRepository.save(user);
    }

    public void changePassword(User user, ChangePasswordRequest dto) {

        String password = dto.password();
        String newPassword = dto.newPassword();

        UserAuthentication authentication = new UserAuthentication(user, password);
        Authentication authenticate = authenticationManager.authenticate(authentication);

        assert authenticate.isAuthenticated();

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);
    }

    @SneakyThrows(IOException.class)
    public void changeAvatar(User user, MultipartFile avatar) {

        if (avatar.getOriginalFilename() == null || avatar.getContentType() != null && !avatar.getContentType().startsWith("image")) {

            throw new AvatarNotImageException();
        }

        if (avatar.getSize() > 5 * 1024 * 1024) {

            throw new AvatarSizeOverException();
        }

        if (ImageUtil.getWidth(avatar.getInputStream()) < 180 || ImageUtil.getHeight(avatar.getInputStream()) < 180) {

            throw new AvatarSizeUnderException();
        }

        String extension = avatar.getOriginalFilename().substring(avatar.getOriginalFilename().lastIndexOf(".") + 1);
        String avatarUrl = s3Service.uploadFile("avatar/%s.%s".formatted(user.getId(), extension), avatar);

        user.setAvatar(avatarUrl);

        userRepository.save(user);
    }

    public void deleteAvatar(User user) {

        s3Service.deleteFile(user.getAvatar().split("amazonaws.com/")[1]);

        user.setAvatar(null);

        userRepository.save(user);
    }
}
