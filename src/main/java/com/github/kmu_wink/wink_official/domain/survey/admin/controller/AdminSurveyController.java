package com.github.kmu_wink.wink_official.domain.survey.admin.controller;

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
import com.github.kmu_wink.wink_official.domain.survey.admin.dto.request.CreateSurveyRequest;
import com.github.kmu_wink.wink_official.domain.survey.admin.dto.response.GetSurveysResponse;
import com.github.kmu_wink.wink_official.domain.survey.admin.service.AdminSurveyService;
import com.github.kmu_wink.wink_official.domain.survey.dto.response.GetSurveyResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/survey")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "[Survey] Admin")
public class AdminSurveyController {

	private final AdminSurveyService adminSurveyService;

	@GetMapping
	public ApiResponse<GetSurveysResponse> getSurveys() {

		return ApiResponse.ok(adminSurveyService.getSurveys());
	}

	@GetMapping("/{surveyId}")
	public ApiResponse<GetSurveyResponse> getSurvey(@PathVariable String surveyId) {

		return ApiResponse.ok(adminSurveyService.getSurvey(surveyId));
	}

	@PostMapping
	public ApiResponse<GetSurveyResponse> createSurvey(@RequestBody @Valid CreateSurveyRequest request) {

		return ApiResponse.ok(adminSurveyService.createSurvey(request));
	}

	@PutMapping("/{surveyId}")
	public ApiResponse<GetSurveyResponse> updateSurvey(@PathVariable String surveyId, @RequestBody @Valid CreateSurveyRequest request) {

		return ApiResponse.ok(adminSurveyService.updateSurvey(surveyId, request));
	}

	@DeleteMapping("/{surveyId}")
	public ApiResponse<Void> deleteSurvey(@PathVariable String surveyId) {

		adminSurveyService.deleteSurvey(surveyId);

		return ApiResponse.ok();
	}
}
