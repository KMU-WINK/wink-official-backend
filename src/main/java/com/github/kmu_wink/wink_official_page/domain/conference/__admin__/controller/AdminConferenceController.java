package com.github.kmu_wink.wink_official_page.domain.conference.__admin__.controller;

import com.github.kmu_wink.wink_official_page.domain.conference.__admin__.dto.request.CreateConferenceRequest;
import com.github.kmu_wink.wink_official_page.domain.conference.__admin__.dto.response.GetConferencesPageableResponse;
import com.github.kmu_wink.wink_official_page.domain.conference.__admin__.dto.response.GetConferencesResponse;
import com.github.kmu_wink.wink_official_page.domain.conference.__admin__.service.AdminConferenceService;
import com.github.kmu_wink.wink_official_page.domain.conference.dto.response.GetConferenceResponse;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import com.github.kmu_wink.wink_official_page.global.security.guard.IsAdmin;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/conference")
@IsAdmin
@RequiredArgsConstructor
@Tag(name = "[Conference] Admin")
public class AdminConferenceController {

    private final AdminConferenceService adminConferenceService;

    @GetMapping
    @Operation(summary = "정기 회의 목록")
    public ApiResponse<GetConferencesPageableResponse> getConferences(
            @RequestParam(required = false, defaultValue = "0") int page
    ) {

        return ApiResponse.ok(adminConferenceService.getConferences(page));
    }

    @GetMapping("/attendance")
    @Operation(summary = "정기 회의 출석부")
    public ApiResponse<GetConferencesResponse> getAttendance(@RequestParam() int year) {

        return ApiResponse.ok(adminConferenceService.getAttendance(year));
    }

    @GetMapping("/{conferenceId}")
    @Operation(summary = "정기 회의 조회")
    public ApiResponse<GetConferenceResponse> getConference(@PathVariable String conferenceId) {

        return ApiResponse.ok(adminConferenceService.getConference(conferenceId));
    }

    @PostMapping
    @Operation(summary = "정기 회의 생성")
    public ApiResponse<GetConferenceResponse> createConference(@RequestBody @Valid CreateConferenceRequest request) {

        return ApiResponse.ok(adminConferenceService.createConference(request));
    }

    @PutMapping("/{conferenceId}")
    @Operation(summary = "정기 회의 수정")
    public ApiResponse<GetConferenceResponse> updateConference(
            @PathVariable String conferenceId,
            @RequestBody @Valid CreateConferenceRequest request
    ) {

        return ApiResponse.ok(adminConferenceService.updateConference(conferenceId, request));
    }

    @DeleteMapping("/{conferenceId}")
    @Operation(summary = "정기 회의 삭제")
    public ApiResponse<Void> deleteConference(@PathVariable String conferenceId) {

        adminConferenceService.deleteConference(conferenceId);

        return ApiResponse.ok();
    }

    @PostMapping("/{conferenceId}/present/{userId}")
    @Operation(summary = "정기 회의 참석 - O")
    public ApiResponse<Void> present(@PathVariable String conferenceId, @PathVariable String userId) {

        adminConferenceService.present(conferenceId, userId);

        return ApiResponse.ok();
    }

    @PostMapping("/{conferenceId}/absent/{userId}")
    @Operation(summary = "정기 회의 참석 - X")
    public ApiResponse<Void> absent(@PathVariable String conferenceId, @PathVariable String userId) {

        adminConferenceService.absent(conferenceId, userId);

        return ApiResponse.ok();
    }
}
