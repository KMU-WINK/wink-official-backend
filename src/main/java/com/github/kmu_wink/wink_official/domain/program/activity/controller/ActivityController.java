package com.github.kmu_wink.wink_official.domain.program.activity.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.program.activity.dto.response.GetActivitiesResponse;
import com.github.kmu_wink.wink_official.domain.program.activity.service.ActivityService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/program/activity")
@RequiredArgsConstructor
@Tag(name = "Program - Activity")
public class ActivityController {

	private final ActivityService activityService;

	@GetMapping
	@Operation(summary = "활동 목록")
	public ApiResponse<GetActivitiesResponse> getActivities() {

		return ApiResponse.ok(activityService.getActivities());
	}
}
