package com.github.kmu_wink.wink_official.domain.recruit.controller;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.ApplicationRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.EmaiilCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.PhoneNumberCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.StudentIdCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.DuplicationCheckResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetLatestRecruitResponse;
import com.github.kmu_wink.wink_official.domain.recruit.service.RecruitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recruit")
@RequiredArgsConstructor
@Tag(name = "Recruit")
public class RecruitController {

    private final RecruitService recruitService;

    @GetMapping
    @Operation(summary = "최근 모집 목록")
    public ApiResponse<GetLatestRecruitResponse> getLatestRecruit() {

        return ApiResponse.ok(recruitService.getLatestRecruit());
    }

    @PostMapping
    @Operation(summary = "지원하기")
    public ApiResponse<Void> application(@RequestBody @Valid ApplicationRequest request) {

        recruitService.application(request);

        return ApiResponse.ok();
    }

    @PostMapping("/check/studentId")
    @Operation(summary = "학번 중복 확인")
    public ApiResponse<DuplicationCheckResponse> checkStudentId(@RequestBody @Valid StudentIdCheckRequest request) {

        return ApiResponse.ok(recruitService.checkStudentId(request));
    }

    @PostMapping("/check/email")
    @Operation(summary = "이메일 중복 확인")
    public ApiResponse<DuplicationCheckResponse> checkEmail(@RequestBody @Valid EmaiilCheckRequest request) {

        return ApiResponse.ok(recruitService.checkEmail(request));
    }

    @PostMapping("/check/phoneNumber")
    @Operation(summary = "전화번호 중복 확인")
    public ApiResponse<DuplicationCheckResponse> checkPhoneNumber(@RequestBody @Valid PhoneNumberCheckRequest request) {

        return ApiResponse.ok(recruitService.checkPhoneNumber(request));
    }
}
