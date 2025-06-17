package com.github.kmu_wink.wink_official_page.domain.program.activity.dto.response;

import java.util.List;

import com.github.kmu_wink.wink_official_page.domain.program.activity.schema.Activity;

import lombok.Builder;

@Builder
public record GetActivitiesResponse(

	List<Activity> activities
) {
}
