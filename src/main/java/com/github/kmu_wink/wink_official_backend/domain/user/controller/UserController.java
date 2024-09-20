package com.github.kmu_wink.wink_official_backend.domain.user.controller;

import com.github.kmu_wink.wink_official_backend.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official_backend.common.security.util.UserContext;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.request.ChangeInfoRequest;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.request.ChangePasswordRequest;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.response.UserListResponse;
import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import com.github.kmu_wink.wink_official_backend.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping()
    public ApiResponse<UserListResponse> getUserList() {

        return ApiResponse.ok(userService.getUserList());
    }

    @PutMapping("/my/info")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<Void> changeInfo(@RequestBody @Valid ChangeInfoRequest request) {

        User user = UserContext.getUser();

        userService.changeInfo(user, request);

        return ApiResponse.ok();
    }

    @PutMapping("/my/password")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<Void> changePassword(@RequestBody @Valid ChangePasswordRequest request) {

        User user = UserContext.getUser();

        userService.changePassword(user, request);

        return ApiResponse.ok();
    }

    @PutMapping("/my/avatar")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<Void> changeAvatar(@RequestPart("avatar") MultipartFile avatar) {

        User user = UserContext.getUser();

        userService.changeAvatar(user, avatar);

        return ApiResponse.ok();
    }

    @DeleteMapping("/my/avatar")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<Void> deleteAvatar() {

        User user = UserContext.getUser();

        userService.deleteAvatar(user);

        return ApiResponse.ok();
    }
}
