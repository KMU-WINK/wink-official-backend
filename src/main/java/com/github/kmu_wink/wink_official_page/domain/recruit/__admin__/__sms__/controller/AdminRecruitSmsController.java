package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.controller;

import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.dto.request.SendTestSmsRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.dto.request.UpdateRecruitSmsRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.dto.response.GetRecruitSmsResponse;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.service.AdminRecruitSmsService;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import com.github.kmu_wink.wink_official_page.global.security.guard.IsAdmin;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[Recruit] [SMS] Admin")
@IsAdmin
@RestController
@RequestMapping("/admin/recruit/{recruitId}/sms")
@RequiredArgsConstructor
public class AdminRecruitSmsController {

    private final AdminRecruitSmsService adminRecruitSmsService;

    @GetMapping
    @Operation(summary = "SMS 설정")
    public ApiResponse<GetRecruitSmsResponse> getRecruitSms(@PathVariable String recruitId) {

        return ApiResponse.ok(adminRecruitSmsService.getRecruitSms(recruitId));
    }


    @PostMapping
    @Operation(summary = "SMS 설정 수정")
    public ApiResponse<GetRecruitSmsResponse> updateRecruitSms(
            @PathVariable String recruitId,
            @RequestBody @Valid UpdateRecruitSmsRequest request
    ) {

        return ApiResponse.ok(adminRecruitSmsService.updateRecruitSms(recruitId, request));
    }

    @PostMapping("/test")
    @Operation(summary = "테스트 SMS 전송")
    public ApiResponse<Void> sendTestSms(
            @PathVariable String recruitId,
            @RequestBody @Valid SendTestSmsRequest request,
            @AuthenticationPrincipal User user
    ) {

        adminRecruitSmsService.sendTestSms(recruitId, request, user);

        return ApiResponse.ok();
    }
}
