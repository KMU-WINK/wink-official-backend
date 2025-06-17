package com.github.kmu_wink.wink_official_page.domain.user.controller;

import com.github.kmu_wink.wink_official_page.domain.program.upload.dto.response.UploadImageResponse;
import com.github.kmu_wink.wink_official_page.domain.user.dto.request.UpdateMyInfoRequest;
import com.github.kmu_wink.wink_official_page.domain.user.dto.request.UpdateMyPasswordRequest;
import com.github.kmu_wink.wink_official_page.domain.user.dto.response.UserResponse;
import com.github.kmu_wink.wink_official_page.domain.user.dto.response.UsersResponse;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.domain.user.service.UserService;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import com.github.kmu_wink.wink_official_page.global.security.guard.IsMember;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "[User] Index")
public class UserController {

    private final UserService userService;

    @GetMapping
    @Operation(summary = "유저 목록")
    public ApiResponse<UsersResponse> getUsers() {

        return ApiResponse.ok(userService.getUsers());
    }

    @PutMapping("/info")
    @Operation(summary = "내 정보 수정")
    @IsMember
    public ApiResponse<UserResponse> updateMyInfo(
            @AuthenticationPrincipal User user,
            @RequestBody @Valid UpdateMyInfoRequest request
    ) {

        return ApiResponse.ok(userService.updateMyInfo(user, request));
    }

    @PostMapping("/avatar")
    @Operation(summary = "내 프로필 사진 업로드")
    @IsMember
    public ApiResponse<UploadImageResponse> uploadMyAvatar() {

        return ApiResponse.ok(userService.uploadMyAvatar());
    }

    @DeleteMapping("/avatar")
    @Operation(summary = "내 프로필 사진 삭제")
    @IsMember
    public ApiResponse<UserResponse> deleteMyAvatar(@AuthenticationPrincipal User user) {

        return ApiResponse.ok(userService.deleteMyAvatar(user));
    }

    @PutMapping("/password")
    @Operation(summary = "내 비밀번호 수정")
    @IsMember
    public ApiResponse<Void> updateMyPassword(
            @AuthenticationPrincipal User user,
            @RequestBody @Valid UpdateMyPasswordRequest request
    ) {

        userService.updateMyPassword(user, request);

        return ApiResponse.ok();
    }
}
