package com.github.kmu_wink.wink_official.domain.meeting.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.meeting.dto.response.GetMettingResponse;
import com.github.kmu_wink.wink_official.domain.meeting.service.MeetingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/meeting")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
@Tag(name = "[Meeting] Index")
public class MeetingController {

	private final MeetingService meetingService;

	@GetMapping("/{meetingId}")
	@Operation(summary = "정기 총회 조회")
	public ApiResponse<GetMettingResponse> getMeeting(@PathVariable String meetingId) {

		return ApiResponse.ok(meetingService.getMeeting(meetingId));
	}
}

