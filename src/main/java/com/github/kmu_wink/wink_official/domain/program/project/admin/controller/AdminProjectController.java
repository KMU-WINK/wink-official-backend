package com.github.kmu_wink.wink_official.domain.program.project.admin.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.program.project.admin.service.AdminProjectService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/program/project")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "[Program] [Project] Admin")
public class AdminProjectController {

	private final AdminProjectService adminProjectService;

	@DeleteMapping("/{id}")
	@Operation(summary = "프로젝트 삭제")
	public ApiResponse<Void> deleteProject(@PathVariable String id) {

		adminProjectService.deleteProject(id);

		return ApiResponse.ok();
	}
}
