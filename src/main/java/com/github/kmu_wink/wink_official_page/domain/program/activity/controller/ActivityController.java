package com.github.kmu_wink.wink_official_page.domain.program.activity.controller;

import com.github.kmu_wink.wink_official_page.domain.program.activity.dto.response.GetActivitiesResponse;
import com.github.kmu_wink.wink_official_page.domain.program.activity.service.ActivityService;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/program/activity")
@RequiredArgsConstructor
@Tag(name = "[Program] [Activity] Index")
public class ActivityController {

	private final ActivityService activityService;

	@GetMapping
	@Operation(summary = "활동 목록")
	public ApiResponse<GetActivitiesResponse> getActivities() {

		return ApiResponse.ok(activityService.getActivities());
	}
}
