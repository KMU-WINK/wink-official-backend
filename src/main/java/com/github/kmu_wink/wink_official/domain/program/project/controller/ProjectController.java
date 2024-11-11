package com.github.kmu_wink.wink_official.domain.program.project.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.program.project.dto.request.CreateProjectRequest;
import com.github.kmu_wink.wink_official.domain.program.project.dto.response.GetProjectResponse;
import com.github.kmu_wink.wink_official.domain.program.project.dto.response.GetProjectsPageableResponse;
import com.github.kmu_wink.wink_official.domain.program.project.service.ProjectService;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/program/project")
@RequiredArgsConstructor
@Tag(name = "Program - Project")
public class ProjectController {

	private final ProjectService projectService;

	@GetMapping
	@Operation(summary = "프로젝트 목록")
	public ApiResponse<GetProjectsPageableResponse> getProjects(
		@RequestParam(required = false, defaultValue = "0") int page,
		@RequestParam(required = false, defaultValue = "") String query) {

		return ApiResponse.ok(projectService.getProjects(page, query));
	}

	@GetMapping("/{id}")
	@Operation(summary = "프로젝트 읽기")
	public ApiResponse<GetProjectResponse> getProject(@PathVariable String id) {

		return ApiResponse.ok(projectService.getProject(id));
	}

	@PostMapping
	@PreAuthorize("isAuthenticated()")
	@Operation(summary = "프로젝트 생성")
	public ApiResponse<GetProjectResponse> createProject(
		@AuthenticationPrincipal User user,
		@RequestBody @Valid CreateProjectRequest request) {

		return ApiResponse.ok(projectService.createProject(user, request));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	@Operation(summary = "프로젝트 수정")
	public ApiResponse<GetProjectResponse> updateProject(
		@AuthenticationPrincipal User user,
		@PathVariable String id,
		@RequestBody @Valid CreateProjectRequest request) {

		return ApiResponse.ok(projectService.updateProject(user, id, request));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	@Operation(summary = "프로젝트 삭제")
	public ApiResponse<Void> deleteProject(@AuthenticationPrincipal User user, @PathVariable String id) {

		projectService.deleteProject(user, id);

		return ApiResponse.ok();
	}
}
