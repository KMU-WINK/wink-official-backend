package com.github.kmu_wink.wink_official.domain.program.study.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.program.study.dto.response.GetCategoriesResponse;
import com.github.kmu_wink.wink_official.domain.program.study.dto.response.GetStudiesResponse;
import com.github.kmu_wink.wink_official.domain.program.study.service.StudyService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/program/study")
@RequiredArgsConstructor
@Tag(name = "Program - Study")
public class StudyController {

	private final StudyService studyService;

	@GetMapping
	@Operation(summary = "모든 게시글 목록")
	public ApiResponse<GetStudiesResponse> getStudies(
		@RequestParam(required = false, defaultValue = "0") int page,
		@RequestParam(required = false, defaultValue = "") String query) {

		return ApiResponse.ok(studyService.getStudies(page, query));
	}

	@GetMapping("/{category}")
	@Operation(summary = "카테고리 게시글 목록")
	public ApiResponse<GetStudiesResponse> getStudies(
		@PathVariable String category,
		@RequestParam(required = false, defaultValue = "0") int page,
		@RequestParam(required = false, defaultValue = "") String query) {

		return ApiResponse.ok(studyService.getStudies(category, page, query));
	}

	@GetMapping("/category")
	@Operation(summary = "모든 카테고리 목록")
	public ApiResponse<GetCategoriesResponse> getCategories() {

		return ApiResponse.ok(studyService.getCategories());
	}
}
