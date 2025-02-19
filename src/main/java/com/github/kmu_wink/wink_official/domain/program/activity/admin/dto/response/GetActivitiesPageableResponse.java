package com.github.kmu_wink.wink_official.domain.program.activity.admin.dto.response;

import org.springframework.data.domain.Page;

import com.github.kmu_wink.wink_official.domain.program.activity.schema.Activity;

import lombok.Builder;

@Builder
public record GetActivitiesPageableResponse(

	Page<Activity> activities
) {
}
