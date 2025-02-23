package com.github.kmu_wink.wink_official.domain.meeting.admin.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.meeting.admin.dto.request.CreateMeetingRequest;
import com.github.kmu_wink.wink_official.domain.meeting.admin.dto.response.GetMeetingsPageableResponse;
import com.github.kmu_wink.wink_official.domain.meeting.admin.service.AdminMeetingService;
import com.github.kmu_wink.wink_official.domain.meeting.dto.response.GetMettingResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/meeting")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "[Meeting] Admin")
public class AdminMeetingController {

	private final AdminMeetingService adminMeetingService;

	@GetMapping
	@Operation(summary = "정기 총회 목록")
	public ApiResponse<GetMeetingsPageableResponse> getMeetings(@RequestParam(required = false, defaultValue = "0") int page) {

		return ApiResponse.ok(adminMeetingService.getMeetings(page));
	}

	@PostMapping
	@Operation(summary = "정기 총회 생성")
	public ApiResponse<GetMettingResponse> createMeeting(@RequestBody @Valid CreateMeetingRequest request) {

		return ApiResponse.ok(adminMeetingService.createMeeting(request));
	}

	@PutMapping("/{meetingId}")
	@Operation(summary = "정기 총회 수정")
	public ApiResponse<GetMettingResponse> updateMeeting(@PathVariable String meetingId, @RequestBody @Valid CreateMeetingRequest request) {

		return ApiResponse.ok(adminMeetingService.updateMeeting(meetingId, request));
	}

	@DeleteMapping("/{meetingId}")
	@Operation(summary = "정기 총회 삭제")
	public ApiResponse<Void> deleteMeeting(@PathVariable String meetingId) {

		adminMeetingService.deleteMeeting(meetingId);

		return ApiResponse.ok();
	}
}
