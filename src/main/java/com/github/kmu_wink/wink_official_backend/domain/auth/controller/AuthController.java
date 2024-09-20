package com.github.kmu_wink.wink_official_backend.domain.auth.controller;

import com.github.kmu_wink.wink_official_backend.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official_backend.common.security.util.UserContext;
import com.github.kmu_wink.wink_official_backend.domain.auth.dto.request.*;
import com.github.kmu_wink.wink_official_backend.domain.auth.dto.response.CheckVerifyCodeResponse;
import com.github.kmu_wink.wink_official_backend.domain.auth.dto.response.LoginResponse;
import com.github.kmu_wink.wink_official_backend.domain.auth.service.AuthService;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.response.UserResponse;
import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PostMapping("/register")
    public ApiResponse<Void> register(@RequestBody @Valid RegisterRequest request) {

        authService.register(request);

        return ApiResponse.ok();
    }

    @PostMapping("/verify-code/send")
    public ApiResponse<Void> sendVerifyCode(@RequestBody @Valid SendVerifyCodeRequest request) {

        authService.sendVerifyCode(request);

        return ApiResponse.ok();
    }

    @PostMapping("/verify-code/check")
    public ApiResponse<CheckVerifyCodeResponse> register(@RequestBody @Valid CheckVerifyCodeRequest request) {

        return ApiResponse.ok(authService.checkVerifyCode(request));
    }

    @PostMapping("/refresh-token")
    public ApiResponse<LoginResponse> refresh(@RequestBody @Valid RefreshRequest request) {

        return ApiResponse.ok(authService.refresh(request));
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<UserResponse> me() {

        User user = UserContext.getUser();

        return ApiResponse.ok(authService.me(user));
    }
}
