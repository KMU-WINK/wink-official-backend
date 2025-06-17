package com.github.kmu_wink.wink_official_page.domain.program.activity.dto.response;

import com.github.kmu_wink.wink_official_page.domain.program.activity.schema.Activity;
import lombok.Builder;

import java.util.List;

@Builder
public record GetActivitiesResponse(

        List<Activity> activities
) {

}
