package com.github.kmu_wink.wink_official_page.domain.conference.controller;

import com.github.kmu_wink.wink_official_page.domain.conference.dto.response.GetConferenceResponse;
import com.github.kmu_wink.wink_official_page.domain.conference.dto.response.GetCurrentParticipantResponse;
import com.github.kmu_wink.wink_official_page.domain.conference.service.ConferenceService;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/conference")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
@Tag(name = "[Conference] Index")
public class ConferenceController {

	private final ConferenceService conferenceService;

	@GetMapping("/{conferenceId}")
	@Operation(summary = "정기 회의")
	public ApiResponse<GetConferenceResponse> getConference(@PathVariable String conferenceId) {

		return ApiResponse.ok(conferenceService.getConference(conferenceId));
	}

	@GetMapping("/{conferenceId}/survey")
	@Operation(summary = "정기 회의 참석 투표 상태")
	public ApiResponse<GetCurrentParticipantResponse> current(@PathVariable String conferenceId, @AuthenticationPrincipal User user) {

		return ApiResponse.ok(conferenceService.current(conferenceId, user));
	}

	@PostMapping("/{conferenceId}/survey/present")
	@Operation(summary = "정기 회의 참석 투표 - O")
	public ApiResponse<Void> surveyPresent(@PathVariable String conferenceId, @AuthenticationPrincipal User user) {

		conferenceService.surveyPresent(conferenceId, user);

		return ApiResponse.ok();
	}

	@PostMapping("/{conferenceId}/survey/absent")
	@Operation(summary = "정기 회의 참석 투표 - X")
	public ApiResponse<Void> surveyAbsent(@PathVariable String conferenceId, @AuthenticationPrincipal User user) {

		conferenceService.surveyAbsent(conferenceId, user);

		return ApiResponse.ok();
	}
}
