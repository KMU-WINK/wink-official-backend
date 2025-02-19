package com.github.kmu_wink.wink_official.domain.recruit.admin.form.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.recruit.admin.form.dto.response.GetFormsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.admin.form.service.AdminRecruitFormService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/recruit/{recruitId}/form")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "[Recuit] [Form] Admin")
public class AdminRecruitFormController {

	private final AdminRecruitFormService adminRecruitFormService;

	@GetMapping
	@Operation(summary = "신청자 목록")
	public ApiResponse<GetFormsResponse> getForms(@PathVariable String recruitId) {

		return ApiResponse.ok(adminRecruitFormService.getForms(recruitId));
	}

	@PostMapping("/{formId}/paper/pass")
	@Operation(summary = "서류 합격 처리")
	public ApiResponse<Void> paperPass(@PathVariable String recruitId, @PathVariable String formId) {

		adminRecruitFormService.paperPass(recruitId, formId);

		return ApiResponse.ok();
	}

	@PostMapping("/{formId}/paper/fail")
	@Operation(summary = "서류 불합격 처리")
	public ApiResponse<Void> paperFail(@PathVariable String recruitId, @PathVariable String formId) {

		adminRecruitFormService.paperFail(recruitId, formId);

		return ApiResponse.ok();
	}

	@PostMapping("/paper/finalize")
	@Operation(summary = "서류 결과 확정")
	public ApiResponse<Void> finalizePaper(@PathVariable String recruitId) {

		adminRecruitFormService.finalizePaper(recruitId);

		return ApiResponse.ok();
	}

	@PostMapping("/{formId}/interview/pass")
	@Operation(summary = "면접 합격 처리")
	public ApiResponse<Void> interviewPass(@PathVariable String recruitId, @PathVariable String formId) {

		adminRecruitFormService.interviewPass(recruitId, formId);

		return ApiResponse.ok();
	}

	@PostMapping("/{formId}/interview/fail")
	@Operation(summary = "면접 불합격 처리")
	public ApiResponse<Void> interviewFail(@PathVariable String recruitId, @PathVariable String formId) {

		adminRecruitFormService.interviewFail(recruitId, formId);

		return ApiResponse.ok();
	}

	@PostMapping("/interview/finalize")
	@Operation(summary = "면접 결과 확정")
	public ApiResponse<Void> finalizeInterview(@PathVariable String recruitId) {

		adminRecruitFormService.finalizeInterview(recruitId);

		return ApiResponse.ok();
	}
}
