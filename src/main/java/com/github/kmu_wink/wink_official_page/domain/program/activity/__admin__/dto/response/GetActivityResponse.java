package com.github.kmu_wink.wink_official_page.domain.program.activity.__admin__.dto.response;

import com.github.kmu_wink.wink_official_page.domain.program.activity.schema.Activity;
import lombok.Builder;

@Builder
public record GetActivityResponse(

        Activity activity
) {

}
