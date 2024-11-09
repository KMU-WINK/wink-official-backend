package com.github.kmu_wink.wink_official.domain.recruit.dto.response;

import java.util.List;

import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;

import lombok.Builder;

@Builder
public record GetApplicationsResponse(

        List<Application> applications
) {
}
