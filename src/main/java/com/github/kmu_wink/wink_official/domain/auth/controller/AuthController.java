package com.github.kmu_wink.wink_official.domain.auth.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.auth.dto.request.CheckRegisterRequest;
import com.github.kmu_wink.wink_official.domain.auth.dto.request.CheckResetPasswordRequest;
import com.github.kmu_wink.wink_official.domain.auth.dto.request.LoginRequest;
import com.github.kmu_wink.wink_official.domain.auth.dto.request.RefreshRequest;
import com.github.kmu_wink.wink_official.domain.auth.dto.request.RegisterRequest;
import com.github.kmu_wink.wink_official.domain.auth.dto.request.RequestResetPasswordRequest;
import com.github.kmu_wink.wink_official.domain.auth.dto.request.ResetPasswordRequest;
import com.github.kmu_wink.wink_official.domain.auth.dto.response.CheckRegisterResponse;
import com.github.kmu_wink.wink_official.domain.auth.dto.response.CheckResetPasswordResponse;
import com.github.kmu_wink.wink_official.domain.auth.dto.response.LoginResponse;
import com.github.kmu_wink.wink_official.domain.auth.service.AuthService;
import com.github.kmu_wink.wink_official.domain.user.dto.response.UserResponse;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "로그인")
    public ApiResponse<LoginResponse> login(@RequestBody @Valid LoginRequest request) {

        return ApiResponse.ok(authService.login(request));
    }

    @PostMapping("/register/check")
    @Operation(summary = "회원가입 토큰 확인")
    public ApiResponse<CheckRegisterResponse> checkRegister(@RequestBody @Valid CheckRegisterRequest request) {

        return ApiResponse.ok(authService.checkRegister(request));
    }

    @PostMapping("/register")
    @Operation(summary = "회원가입")
    public ApiResponse<Void> register(@RequestBody @Valid RegisterRequest request) {

        authService.register(request);

        return ApiResponse.ok();
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "토큰 갱신")
    public ApiResponse<LoginResponse> refresh(@RequestBody @Valid RefreshRequest request) {

        return ApiResponse.ok(authService.refresh(request));
    }

    @PostMapping("/reset-password/request")
    @Operation(summary = "비밀번호 초기화 요청")
    public ApiResponse<Void> requestResetPassword(@RequestBody @Valid RequestResetPasswordRequest request) {

        authService.requestResetPassword(request);

        return ApiResponse.ok();
    }

    @PostMapping("/reset-password/check")
    @Operation(summary = "비밀번초 초기화 토큰 확인")
    public ApiResponse<CheckResetPasswordResponse> checkResetPassword(@RequestBody @Valid CheckResetPasswordRequest request) {

        return ApiResponse.ok(authService.checkResetPassword(request));
    }

    @PostMapping("/reset-password")
    @Operation(summary = "비밀번호 초기화")
    public ApiResponse<Void> resetPassword(@RequestBody @Valid ResetPasswordRequest request) {

        authService.resetPassword(request);

        return ApiResponse.ok();
    }

    @GetMapping("/me")
    @Operation(summary = "내 정보 확인")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<UserResponse> me(@AuthenticationPrincipal User user) {

        return ApiResponse.ok(authService.me(user));
    }
}
