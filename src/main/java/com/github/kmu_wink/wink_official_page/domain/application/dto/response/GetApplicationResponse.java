package com.github.kmu_wink.wink_official_page.domain.application.dto.response;

import com.github.kmu_wink.wink_official_page.domain.application.schema.Application;

import lombok.Builder;

@Builder
public record GetApplicationResponse(

	Application application
) {
}
