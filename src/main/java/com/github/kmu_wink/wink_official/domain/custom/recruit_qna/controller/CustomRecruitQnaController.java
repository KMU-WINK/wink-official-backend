package com.github.kmu_wink.wink_official.domain.custom.recruit_qna.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.response.GetRecruitQnaResponse;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.service.CustomRecruitQnaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/custom/recruit-qna")
@RequiredArgsConstructor
@Tag(name = "Custom - Recruit Qna")
public class CustomRecruitQnaController {

	private final CustomRecruitQnaService customRecruitQnaService;

	@GetMapping
	@Operation(summary = "Q&A 목록")
	public ApiResponse<GetRecruitQnaResponse> getRecruitQna() {

		return ApiResponse.ok(customRecruitQnaService.getRecruitQna());
	}
}
