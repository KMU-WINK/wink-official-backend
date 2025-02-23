package com.github.kmu_wink.wink_official.domain.recruit.admin.sms.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.dto.request.UpdateRecruitSmsRequest;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.dto.response.GetRecruitSmsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.service.AdminRecruitSmsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/recruit/{recruitId}/sms")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "[Recruit] [SMS] Admin")
public class AdminRecruitSmsController {

	private final AdminRecruitSmsService adminRecruitSmsService;

	@GetMapping
	@Operation(summary = "SMS 설정")
	public ApiResponse<GetRecruitSmsResponse> getRecruitSms(@PathVariable String recruitId) {

		return ApiResponse.ok(adminRecruitSmsService.getRecruitSms(recruitId));
	}


	@PostMapping
	@Operation(summary = "SMS 설정 수정")
	public ApiResponse<GetRecruitSmsResponse> updateRecruitSms(@PathVariable String recruitId, @RequestBody @Valid UpdateRecruitSmsRequest request) {

		return ApiResponse.ok(adminRecruitSmsService.updateRecruitSms(recruitId, request));
	}
}
