package com.github.kmu_wink.wink_official_page.domain.application.controller;

import com.github.kmu_wink.wink_official_page.domain.application.dto.request.CreateApplicationRequest;
import com.github.kmu_wink.wink_official_page.domain.application.dto.request.OauthTokenRequest;
import com.github.kmu_wink.wink_official_page.domain.application.dto.request.UpdateApplicationLoginRequest;
import com.github.kmu_wink.wink_official_page.domain.application.dto.request.UpdateApplicationRequest;
import com.github.kmu_wink.wink_official_page.domain.application.dto.response.GetApplicationResponse;
import com.github.kmu_wink.wink_official_page.domain.application.dto.response.GetApplicationsResponse;
import com.github.kmu_wink.wink_official_page.domain.application.dto.response.OauthLoginResponse;
import com.github.kmu_wink.wink_official_page.domain.application.dto.response.OauthTokenResponse;
import com.github.kmu_wink.wink_official_page.domain.application.service.ApplicationService;
import com.github.kmu_wink.wink_official_page.domain.program.upload.dto.response.UploadImageResponse;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import com.github.kmu_wink.wink_official_page.global.security.guard.IsMember;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[Application] Index")
@IsMember
@RestController
@RequestMapping("/application")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping
    @Operation(summary = "내 애플리케이션 목록")
    public ApiResponse<GetApplicationsResponse> getApplications(@AuthenticationPrincipal User user) {

        return ApiResponse.ok(applicationService.getApplications(user));
    }

    @GetMapping("/{id}")
    @Operation(summary = "애플리케이션 조회")
    public ApiResponse<GetApplicationResponse> getApplication(
            @AuthenticationPrincipal User user,
            @PathVariable String id
    ) {

        return ApiResponse.ok(applicationService.getApplication(user, id));
    }

    @PostMapping
    @Operation(summary = "내 애플리케이션 추가")
    public ApiResponse<GetApplicationResponse> createApplication(
            @AuthenticationPrincipal User user,
            @RequestBody @Valid CreateApplicationRequest request
    ) {

        return ApiResponse.ok(applicationService.createApplication(user, request));
    }

    @PostMapping("/img")
    @Operation(summary = "이미지 업로드")
    public ApiResponse<UploadImageResponse> uploadImg() {

        return ApiResponse.ok(applicationService.uploadImg());
    }

    @PutMapping("/{id}")
    @Operation(summary = "내 애플리케이션 수정")
    public ApiResponse<GetApplicationResponse> updateApplication(
            @AuthenticationPrincipal User user,
            @PathVariable String id,
            @RequestBody @Valid UpdateApplicationRequest request
    ) {

        return ApiResponse.ok(applicationService.updateApplication(user, id, request));
    }

    @PostMapping("/{id}/secret")
    @Operation(summary = "애플리케이션 시크릿 재발급")
    public ApiResponse<GetApplicationResponse> resetSecret(
            @AuthenticationPrincipal User user,
            @PathVariable String id
    ) {

        return ApiResponse.ok(applicationService.resetSecret(user, id));
    }

    @PutMapping("/{id}/login")
    @Operation(summary = "애플리케이션 로그인 설정 수정")
    public ApiResponse<GetApplicationResponse> updateApplicationLogin(
            @AuthenticationPrincipal User user,
            @PathVariable String id,
            @RequestBody @Valid UpdateApplicationLoginRequest request
    ) {

        return ApiResponse.ok(applicationService.updateApplicationLogin(user, id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "내 애플리케이션 삭제")
    public ApiResponse<Void> deleteApplication(@AuthenticationPrincipal User user, @PathVariable String id) {

        applicationService.deleteApplication(user, id);

        return ApiResponse.ok();
    }

    @PostMapping("/{id}/oauth")
    @Operation(summary = "Oauth 로그인")
    public ApiResponse<OauthLoginResponse> oauthLogin(@AuthenticationPrincipal User user, @PathVariable String id) {

        return ApiResponse.ok(applicationService.oauthLogin(user, id));
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/oauth/token")
    @Operation(summary = "Oauth 정보")
    public ApiResponse<OauthTokenResponse> oauthToken(@RequestBody @Valid OauthTokenRequest request) {

        return ApiResponse.ok(applicationService.oauthToken(request));
    }
}
