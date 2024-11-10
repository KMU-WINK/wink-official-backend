package com.github.kmu_wink.wink_official.domain.program.history.controller;

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
import com.github.kmu_wink.wink_official.domain.program.history.dto.request.CreateHistoryRequest;
import com.github.kmu_wink.wink_official.domain.program.history.dto.response.GetHistoriesPageableResponse;
import com.github.kmu_wink.wink_official.domain.program.history.dto.response.GetHistoryResponse;
import com.github.kmu_wink.wink_official.domain.program.history.service.AdminHistoryService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/program/history")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Program - History")
public class AdminHistoryController {

	private final AdminHistoryService adminHistoryService;

	@GetMapping
	public ApiResponse<GetHistoriesPageableResponse> getHistories(
		@RequestParam(required = false, defaultValue = "0") int page,
		@RequestParam(required = false, defaultValue = "") String query) {

		return ApiResponse.ok(adminHistoryService.getHistories(page, query));
	}

	@PostMapping
	public ApiResponse<GetHistoryResponse> getHistories(@RequestBody @Valid CreateHistoryRequest request) {

		return ApiResponse.ok(adminHistoryService.createHistory(request));
	}

	@PutMapping("/{id}")
	public ApiResponse<GetHistoryResponse> updateHistory(@PathVariable String id, @RequestBody @Valid CreateHistoryRequest request) {

		return ApiResponse.ok(adminHistoryService.updateHistory(id, request));
	}

	@DeleteMapping("/{id}")
	public ApiResponse<Void> deleteHistory(@PathVariable String id) {

		adminHistoryService.deleteHistory(id);

		return ApiResponse.ok();
	}
}
