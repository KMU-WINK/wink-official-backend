package com.github.kmu_wink.wink_official_page.domain.program.activity.__admin__.dto.response;

import com.github.kmu_wink.wink_official_page.domain.program.activity.schema.Activity;
import lombok.Builder;
import org.springframework.data.domain.Page;

@Builder
public record GetActivitiesPageableResponse(

        Page<Activity> activities
) {

}
