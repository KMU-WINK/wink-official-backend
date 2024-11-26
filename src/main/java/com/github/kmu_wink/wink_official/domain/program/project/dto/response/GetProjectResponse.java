package com.github.kmu_wink.wink_official.domain.program.project.dto.response;

import com.github.kmu_wink.wink_official.domain.program.project.schema.Project;

import lombok.Builder;

@Builder
public record GetProjectResponse(

	Project project
) {
}