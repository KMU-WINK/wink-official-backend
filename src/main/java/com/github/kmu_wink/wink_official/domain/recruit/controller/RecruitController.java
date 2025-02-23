package com.github.kmu_wink.wink_official.domain.recruit.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.EmailCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.PhoneNumberCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.RecruitFormRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.StudentIdCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.DuplicationCheckResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official.domain.recruit.service.RecruitService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/recruit")
@RequiredArgsConstructor
@Tag(name = "[Recruit] Index")
public class RecruitController {

    private final RecruitService recruitService;

    @GetMapping("/latest")
    @Operation(summary = "최근 모집")
    public ApiResponse<GetRecruitResponse> getLatestRecruit() {

        return ApiResponse.ok(recruitService.getLatestRecruit());
    }

    @PostMapping("/{recruitId}")
    @Operation(summary = "지원하기")
    public ApiResponse<Void> recruitForm(@PathVariable String recruitId, @RequestBody @Valid RecruitFormRequest request) {

        recruitService.recruitForm(recruitId, request);

        return ApiResponse.ok();
    }

    @PostMapping("/{recruitId}/check/studentId")
    @Operation(summary = "학번 중복 확인")
    public ApiResponse<DuplicationCheckResponse> checkStudentId(@PathVariable String recruitId, @RequestBody @Valid StudentIdCheckRequest request) {

        return ApiResponse.ok(recruitService.checkStudentId(recruitId, request));
    }

    @PostMapping("/{recruitId}/check/email")
    @Operation(summary = "이메일 중복 확인")
    public ApiResponse<DuplicationCheckResponse> checkEmail(@PathVariable String recruitId, @RequestBody @Valid EmailCheckRequest request) {

        return ApiResponse.ok(recruitService.checkEmail(recruitId, request));
    }

    @PostMapping("/{recruitId}/check/phoneNumber")
    @Operation(summary = "전화번호 중복 확인")
    public ApiResponse<DuplicationCheckResponse> checkPhoneNumber(@PathVariable String recruitId, @RequestBody @Valid PhoneNumberCheckRequest request) {

        return ApiResponse.ok(recruitService.checkPhoneNumber(recruitId, request));
    }
}
