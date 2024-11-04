package com.github.kmu_wink.wink_official.domain.user.controller;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.user.dto.request.UpdateMyInfoRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.request.UpdateMyPasswordRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.response.UpdateMyAvatarResponse;
import com.github.kmu_wink.wink_official.domain.user.dto.response.UsersResponse;
import com.github.kmu_wink.wink_official.domain.user.schema.User;
import com.github.kmu_wink.wink_official.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {

    private final UserService userService;

    @GetMapping
    @Operation(summary = "유저 목록")
    public ApiResponse<UsersResponse> getUsers() {

        return ApiResponse.ok(userService.getUsers());
    }

    @PutMapping("/info")
    @Operation(summary = "내 정보 수정")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<Void> updateMyInfo(@AuthenticationPrincipal User user, @RequestBody @Valid UpdateMyInfoRequest request) {

        userService.updateMyInfo(user, request);

        return ApiResponse.ok();
    }

    @PostMapping("/avatar")
    @Operation(summary = "내 프로필 사진 수정")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<UpdateMyAvatarResponse> updateMyAvatar(@AuthenticationPrincipal User user) {

        return ApiResponse.ok(userService.updateMyAvatar(user));
    }

    @DeleteMapping("/avatar")
    @Operation(summary = "내 프로필 사진 삭제")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<Void> deleteMyAvatar(@AuthenticationPrincipal User user) {

        userService.deleteMyAvatar(user);

        return ApiResponse.ok();
    }

    @PutMapping("/password")
    @Operation(summary = "내 비밀번호 수정")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<Void> updateMyPassword(@AuthenticationPrincipal User user, @RequestBody @Valid UpdateMyPasswordRequest request) {

        userService.updateMyPassword(user, request);

        return ApiResponse.ok();
    }

    @GetMapping("/callback/aws")
    @Hidden
    public void awsCallback(@RequestParam String userId) {

        userService.awsCallback(userId);
    }
}
