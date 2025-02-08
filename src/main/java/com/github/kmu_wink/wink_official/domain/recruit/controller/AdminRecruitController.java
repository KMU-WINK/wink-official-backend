package com.github.kmu_wink.wink_official.domain.recruit.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.CreateRecruitRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.FinalizePaperRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetFormsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.service.AdminRecruitService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/recruit")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "[Admin] Recruit")
public class AdminRecruitController {

	private final AdminRecruitService adminRecruitService;

	@GetMapping
	@Operation(summary = "모집 목록")
	public ApiResponse<GetRecruitsResponse> getRecruits() {

		return ApiResponse.ok(adminRecruitService.getRecruits());
	}

	@GetMapping("/{recruitId}")
	@Operation(summary = "모집 조회")
	public ApiResponse<GetRecruitResponse> getRecruit(@PathVariable String recruitId) {

		return ApiResponse.ok(adminRecruitService.getRecruit(recruitId));
	}

	@PostMapping
	@Operation(summary = "모집 생성")
	public ApiResponse<GetRecruitResponse> createRecruit(@RequestBody @Valid CreateRecruitRequest request) {

		return ApiResponse.ok(adminRecruitService.createRecruit(request));
	}

	@DeleteMapping("/{recruitId}")
	@Operation(summary = "모집 삭제")
	public ApiResponse<Void> deleteRecruit(@PathVariable String recruitId) {

		adminRecruitService.deleteRecruit(recruitId);

		return ApiResponse.ok();
	}

	@PostMapping("/{recruitId}/finalize/paper")
	@Operation(summary = "서류 결과 확정")
	public ApiResponse<Void> finalizePaper(@PathVariable String recruitId, @RequestBody @Valid FinalizePaperRequest request) {

		adminRecruitService.finalizePaper(recruitId, request);

		return ApiResponse.ok();
	}

	@PostMapping("/{recruitId}/finalize/interview")
	@Operation(summary = "면접 결과 확정")
	public ApiResponse<Void> finalizeInterview(@PathVariable String recruitId) {

		adminRecruitService.finalizeInterview(recruitId);

		return ApiResponse.ok();
	}

	@GetMapping("/{recruitId}/form")
	@Operation(summary = "신청자 목록")
	public ApiResponse<GetFormsResponse> getForms(@PathVariable String recruitId) {

		return ApiResponse.ok(adminRecruitService.getForms(recruitId));
	}

	@PostMapping("/{recruitId}/form/{formId}/pass/paper")
	@Operation(summary = "서류 합격 처리")
	public ApiResponse<Void> paperPass(@PathVariable String recruitId, @PathVariable String formId) {

		adminRecruitService.paperPass(recruitId, formId);

		return ApiResponse.ok();
	}

	@PostMapping("/{recruitId}/form/{formId}/fail/paper")
	@Operation(summary = "서류 불합격 처리")
	public ApiResponse<Void> paperFail(@PathVariable String recruitId, @PathVariable String formId) {

		adminRecruitService.paperFail(recruitId, formId);

		return ApiResponse.ok();
	}

	@PostMapping("/{recruitId}/form/{formId}/pass/interview")
	@Operation(summary = "면접 합격 처리")
	public ApiResponse<Void> interviewPass(@PathVariable String recruitId, @PathVariable String formId) {

		adminRecruitService.interviewPass(recruitId, formId);

		return ApiResponse.ok();
	}

	@PostMapping("/{recruitId}/form/{formId}/fail/interview")
	@Operation(summary = "면접 불합격 처리")
	public ApiResponse<Void> interviewFail(@PathVariable String recruitId, @PathVariable String formId) {

		adminRecruitService.interviewFail(recruitId, formId);

		return ApiResponse.ok();
	}
}
