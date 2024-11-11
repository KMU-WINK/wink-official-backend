package com.github.kmu_wink.wink_official.domain.program.project.dto.response;

import org.springframework.data.domain.Page;

import com.github.kmu_wink.wink_official.domain.program.project.schema.Project;

import lombok.Builder;

@Builder
public record GetProjectsPageableResponse(

	Page<Project> projects
) {
}
