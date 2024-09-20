package com.github.kmu_wink.wink_official_backend.domain.user.service;

import com.github.kmu_wink.wink_official_backend.common.email.EmailSender;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.request.AdminChangeInfoRequest;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.response.UserListResponse;
import com.github.kmu_wink.wink_official_backend.domain.user.email.ApprovedTemplate;
import com.github.kmu_wink.wink_official_backend.domain.user.email.RejectedTemplate;
import com.github.kmu_wink.wink_official_backend.domain.user.exception.UserNotFoundException;
import com.github.kmu_wink.wink_official_backend.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAdminService {

    private final UserRepository userRepository;
    private final UserService userService;

    private final EmailSender emailSender;

    public UserListResponse getWaitingUserList() {

        List<User> users = userRepository.findAllByApprovedFalse(Sort.by(Sort.Order.asc("createdAt")));

        return UserListResponse.builder()
                .users(users)
                .build();
    }

    public void approveUser(String userId) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        user.setApproved(true);
        user.setRole(User.Role.MEMBER);

        userRepository.save(user);

        emailSender.send(user.getEmail(), ApprovedTemplate.of(user.getName()));
    }

    public void rejectUser(String userId) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        userRepository.delete(user);

        emailSender.send(user.getEmail(), RejectedTemplate.of(user.getName()));
    }

    public void changeInfo(String userId, AdminChangeInfoRequest dto) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        String name = dto.name();
        String studentId = dto.studentId();
        String email = dto.email();
        String description = dto.description();
        String github = dto.github();
        String instagram = dto.instagram();
        String blog = dto.blog();

        user.setName(name);
        user.setStudentId(studentId);
        user.setEmail(email);
        user.setDescription(description);

        User.Social social = user.getSocial();
        social.setGithub(github);
        social.setInstagram(instagram);
        social.setBlog(blog);

        user.setSocial(social);

        userRepository.save(user);
    }

    public void deleteUserAvatar(String userId) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        userService.deleteAvatar(user);
    }

    public void deleteUser(String userId) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        userService.deleteAvatar(user);
        userRepository.delete(user);
    }
}
