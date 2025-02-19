package com.github.kmu_wink.wink_official.domain.program.upload.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.program.upload.dto.response.UploadImageResponse;
import com.github.kmu_wink.wink_official.domain.program.upload.service.UploadService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/program/upload")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
@Tag(name = "[Program] [Upload] Index")
public class UploadController {

	private final UploadService uploadService;

	@PostMapping("/image")
	@Operation(summary = "이미지 업로드")
	public ApiResponse<UploadImageResponse> uploadImage() {

		return ApiResponse.ok(uploadService.uploadImage());
	}
}
