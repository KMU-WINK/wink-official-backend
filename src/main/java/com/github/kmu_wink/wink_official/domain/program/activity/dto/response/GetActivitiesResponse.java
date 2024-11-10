package com.github.kmu_wink.wink_official.domain.program.activity.dto.response;

import org.springframework.data.domain.Page;

import com.github.kmu_wink.wink_official.domain.program.activity.schema.Activity;

import lombok.Builder;

@Builder
public record GetActivitiesResponse(

	Page<Activity> activities
) {
}
