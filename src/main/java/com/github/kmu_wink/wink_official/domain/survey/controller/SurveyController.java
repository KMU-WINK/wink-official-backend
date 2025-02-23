package com.github.kmu_wink.wink_official.domain.survey.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.survey.dto.response.GetSurveyResponse;
import com.github.kmu_wink.wink_official.domain.survey.service.SurveyService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/survey")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
@Tag(name = "[Survey] Index")
public class SurveyController {

	private final SurveyService surveyService;

	@GetMapping("/{surveyId}")
	@Operation(summary = "설문 조회")
	public ApiResponse<GetSurveyResponse> getSurvey(@PathVariable String surveyId) {

		return ApiResponse.ok(surveyService.getSurvey(surveyId));
	}
}

