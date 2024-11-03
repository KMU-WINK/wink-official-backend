package com.github.kmu_wink.wink_official.domain.auth.controller;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.auth.dto.request.*;
import com.github.kmu_wink.wink_official.domain.auth.dto.response.CheckRegisterResponse;
import com.github.kmu_wink.wink_official.domain.auth.dto.response.CheckResetPasswordResponse;
import com.github.kmu_wink.wink_official.domain.auth.dto.response.LoginResponse;
import com.github.kmu_wink.wink_official.domain.auth.service.AuthService;
import com.github.kmu_wink.wink_official.domain.user.dto.response.UserResponse;
import com.github.kmu_wink.wink_official.domain.user.schema.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody @Valid LoginRequest request) {

        return ApiResponse.ok(authService.login(request));
    }

    @PostMapping("/register/check")
    public ApiResponse<CheckRegisterResponse> checkRegister(@RequestBody @Valid CheckRegisterRequest request) {

        return ApiResponse.ok(authService.checkRegister(request));
    }

    @PostMapping("/register")
    public ApiResponse<Void> register(@RequestBody @Valid RegisterRequest request) {

        authService.register(request);

        return ApiResponse.ok();
    }

    @PostMapping("/refresh-token")
    public ApiResponse<LoginResponse> refresh(@RequestBody @Valid RefreshRequest request) {

        return ApiResponse.ok(authService.refresh(request));
    }

    @PostMapping("/reset-password/request")
    public ApiResponse<Void> requestResetPassword(@RequestBody @Valid RequestResetPasswordRequest request) {

        authService.requestResetPassword(request);

        return ApiResponse.ok();
    }

    @PostMapping("/reset-password/check")
    public ApiResponse<CheckResetPasswordResponse> checkResetPassword(@RequestBody @Valid CheckResetPasswordRequest request) {

        return ApiResponse.ok(authService.checkResetPassword(request));
    }

    @PostMapping("/reset-password")
    public ApiResponse<Void> resetPassword(@RequestBody @Valid ResetPasswordRequest request) {

        authService.resetPassword(request);

        return ApiResponse.ok();
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<UserResponse> me(@AuthenticationPrincipal User user) {

        return ApiResponse.ok(authService.me(user));
    }
}
