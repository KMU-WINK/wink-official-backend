package com.github.kmu_wink.wink_official.domain.application.dto.response;

import java.util.List;

import com.github.kmu_wink.wink_official.domain.application.schema.Application;

import lombok.Builder;

@Builder
public record GetApplicationsResponse(

	List<Application> applications
) {
}
