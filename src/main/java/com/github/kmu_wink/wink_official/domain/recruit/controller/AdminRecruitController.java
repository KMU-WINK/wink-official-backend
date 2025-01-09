package com.github.kmu_wink.wink_official.domain.recruit.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.CreateRecruitRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.FinalizePaperRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetApplicationResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetApplicationsResponse;
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

	@PutMapping("/{recruitId}")
	@Operation(summary = "모집 수정")
	public ApiResponse<GetRecruitResponse> updateRecruit(@PathVariable String recruitId, @RequestBody @Valid CreateRecruitRequest request) {

		return ApiResponse.ok(adminRecruitService.updateRecruit(recruitId, request));
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

	@GetMapping("/{recruitId}/application")
	@Operation(summary = "신청자 목록")
	public ApiResponse<GetApplicationsResponse> getApplications(@PathVariable String recruitId) {

		return ApiResponse.ok(adminRecruitService.getApplications(recruitId));
	}

	@GetMapping("/{recruitId}/application/{applicationId}")
	@Operation(summary = "신청자 조회")
	public ApiResponse<GetApplicationResponse> getApplication(@PathVariable String recruitId, @PathVariable String applicationId) {

		return ApiResponse.ok(adminRecruitService.getApplication(recruitId, applicationId));
	}

	@PostMapping("/{recruitId}/application/{applicationId}/pass/paper")
	@Operation(summary = "서류 합격 처리")
	public ApiResponse<Void> paperPass(@PathVariable String recruitId, @PathVariable String applicationId) {

		adminRecruitService.paperPass(recruitId, applicationId);

		return ApiResponse.ok();
	}

	@PostMapping("/{recruitId}/application/{applicationId}/fail/paper")
	@Operation(summary = "서류 불합격 처리")
	public ApiResponse<Void> paperFail(@PathVariable String recruitId, @PathVariable String applicationId) {

		adminRecruitService.paperFail(recruitId, applicationId);

		return ApiResponse.ok();
	}

	@PostMapping("/{recruitId}/application/{applicationId}/pass/interview")
	@Operation(summary = "면접 합격 처리")
	public ApiResponse<Void> interviewPass(@PathVariable String recruitId, @PathVariable String applicationId) {

		adminRecruitService.interviewPass(recruitId, applicationId);

		return ApiResponse.ok();
	}

	@PostMapping("/{recruitId}/application/{applicationId}/fail/interview")
	@Operation(summary = "면접 불합격 처리")
	public ApiResponse<Void> interviewFail(@PathVariable String recruitId, @PathVariable String applicationId) {

		adminRecruitService.interviewFail(recruitId, applicationId);

		return ApiResponse.ok();
	}
}
