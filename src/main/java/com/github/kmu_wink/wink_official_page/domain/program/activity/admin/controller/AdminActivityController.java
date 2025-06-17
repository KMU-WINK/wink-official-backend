package com.github.kmu_wink.wink_official_page.domain.program.activity.admin.controller;

import com.github.kmu_wink.wink_official_page.domain.program.activity.admin.dto.request.CreateActivityRequest;
import com.github.kmu_wink.wink_official_page.domain.program.activity.admin.dto.response.GetActivitiesPageableResponse;
import com.github.kmu_wink.wink_official_page.domain.program.activity.admin.dto.response.GetActivityResponse;
import com.github.kmu_wink.wink_official_page.domain.program.activity.admin.service.AdminActivityService;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/program/activity")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "[Program] [Activity] Admin")
public class AdminActivityController {

	private final AdminActivityService adminActivityService;

	@GetMapping
	@Operation(summary = "활동 목록")
	public ApiResponse<GetActivitiesPageableResponse> getActivities(
		@RequestParam(required = false, defaultValue = "0") int page,
		@RequestParam(required = false, defaultValue = "") String query) {

		return ApiResponse.ok(adminActivityService.getActivities(page, query));
	}

	@PostMapping
	@Operation(summary = "활동 생성")
	public ApiResponse<GetActivityResponse> createActivity(@RequestBody @Valid CreateActivityRequest request) {

		return ApiResponse.ok(adminActivityService.createActivity(request));
	}

	@PutMapping("/{id}")
	@Operation(summary = "활동 수정")
	public ApiResponse<GetActivityResponse> updateActivity(@PathVariable String id, @RequestBody @Valid CreateActivityRequest request) {

		return ApiResponse.ok(adminActivityService.updateActivity(id, request));
	}

	@DeleteMapping("/{id}")
	@Operation(summary = "활동 삭제")
	public ApiResponse<Void> deleteActivity(@PathVariable String id) {

		adminActivityService.deleteActivity(id);

		return ApiResponse.ok();
	}

	@PatchMapping("/{id}/pin")
	@Operation(summary = "활동 고정")
	public ApiResponse<GetActivityResponse> pinActivity(@PathVariable String id) {

		return ApiResponse.ok(adminActivityService.pinActivity(id));
	}

	@DeleteMapping("/{id}/pin")
	@Operation(summary = "활동 고정 해제")
	public ApiResponse<GetActivityResponse> unpinActivity(@PathVariable String id) {

		return ApiResponse.ok(adminActivityService.unpinActivity(id));
	}
}
