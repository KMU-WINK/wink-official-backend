package com.github.kmu_wink.wink_official.domain.program.activity.controller;

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

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.program.activity.dto.request.CreateActivityRequest;
import com.github.kmu_wink.wink_official.domain.program.activity.dto.response.GetActivitiesPageableResponse;
import com.github.kmu_wink.wink_official.domain.program.activity.dto.response.GetActivityResponse;
import com.github.kmu_wink.wink_official.domain.program.activity.service.AdminActivityService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/program/activity")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Program - Activity")
public class AdminActivityController {

	private final AdminActivityService adminActivityService;

	@GetMapping
	public ApiResponse<GetActivitiesPageableResponse> getActivities(
		@RequestParam(required = false, defaultValue = "0") int page,
		@RequestParam(required = false, defaultValue = "") String query) {

		return ApiResponse.ok(adminActivityService.getActivities(page, query));
	}

	@PostMapping
	public ApiResponse<GetActivityResponse> createActivity(@RequestBody @Valid CreateActivityRequest request) {

		return ApiResponse.ok(adminActivityService.createActivity(request));
	}

	@PutMapping("/{id}")
	public ApiResponse<GetActivityResponse> updateActivity(@PathVariable String id, @RequestBody @Valid CreateActivityRequest request) {

		return ApiResponse.ok(adminActivityService.updateActivity(id, request));
	}

	@DeleteMapping("/{id}")
	public ApiResponse<Void> deleteActivity(@PathVariable String id) {

		adminActivityService.deleteActivity(id);

		return ApiResponse.ok();
	}

	@PatchMapping("/{id}/pin")
	public ApiResponse<GetActivityResponse> pinActivity(@PathVariable String id) {

		return ApiResponse.ok(adminActivityService.pinActivity(id));
	}

	@DeleteMapping("/{id}/pin")
	public ApiResponse<GetActivityResponse> unpinActivity(@PathVariable String id) {

		return ApiResponse.ok(adminActivityService.unpinActivity(id));
	}
}
