package com.github.kmu_wink.wink_official.domain.migrate.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.migrate.dto.request.MigrateRequest;
import com.github.kmu_wink.wink_official.domain.migrate.service.MigrateService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/migrate")
@RequiredArgsConstructor
@Tag(name = "[Migrate] Index")
public class MigrateController {

	private final MigrateService migrateService;

	@PostMapping
	@Operation(summary = "Migrate")
	public ApiResponse<Void> migrate(@RequestBody @Valid MigrateRequest request) {

		migrateService.migrate(request);

		return ApiResponse.ok();
	}
}
