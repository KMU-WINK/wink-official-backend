package com.github.kmu_wink.wink_official.domain.custom.recruit_qna.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.request.CreateQnaRequest;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.request.DeleteQnaRequest;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.request.UpdateQnaRequest;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.response.GetRecruitQnaResponse;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.service.AdminCustomRecruitQnaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/custom/recruit-qna")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "[Admin] Custom - Recruit Qna")
public class AdminCustomRecruitQnaController {

	private final AdminCustomRecruitQnaService adminCustomRecruitQnaService;

	@PostMapping
	@Operation(summary = "Q&A 생성")
	public ApiResponse<GetRecruitQnaResponse> createQna(@RequestBody @Valid CreateQnaRequest request) {

		return ApiResponse.ok(adminCustomRecruitQnaService.createQna(request));
	}

	@PutMapping
	@Operation(summary = "Q&A 수정")
	public ApiResponse<GetRecruitQnaResponse> updateQna(@RequestBody @Valid UpdateQnaRequest request) {

		return ApiResponse.ok(adminCustomRecruitQnaService.updateQna(request));
	}

	@DeleteMapping
	@Operation(summary = "Q&A 삭제")
	public ApiResponse<Void> deleteQna(@RequestBody @Valid DeleteQnaRequest request) {

		adminCustomRecruitQnaService.deleteQna(request);

		return ApiResponse.ok();
	}
}
