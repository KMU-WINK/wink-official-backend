package com.github.kmu_wink.wink_official_page.domain.program.project.admin.controller;

import com.github.kmu_wink.wink_official_page.domain.program.project.admin.service.AdminProjectService;
import com.github.kmu_wink.wink_official_page.domain.program.project.dto.request.CreateProjectRequest;
import com.github.kmu_wink.wink_official_page.domain.program.project.dto.response.GetProjectResponse;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/program/project")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "[Program] [Project] Admin")
public class AdminProjectController {

	private final AdminProjectService adminProjectService;

	@PutMapping("/{id}")
	@Operation(summary = "프로젝트 수정")
	public ApiResponse<GetProjectResponse> updateProject(@PathVariable String id, @RequestBody @Valid CreateProjectRequest request) {

		return ApiResponse.ok(adminProjectService.updateProject(id, request));
	}

	@DeleteMapping("/{id}")
	@Operation(summary = "프로젝트 삭제")
	public ApiResponse<Void> deleteProject(@PathVariable String id) {

		adminProjectService.deleteProject(id);

		return ApiResponse.ok();
	}
}
