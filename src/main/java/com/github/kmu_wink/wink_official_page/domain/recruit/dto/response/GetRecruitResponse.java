package com.github.kmu_wink.wink_official_page.domain.recruit.dto.response;

import com.github.kmu_wink.wink_official_page.domain.recruit.schema.Recruit;
import lombok.Builder;

@Builder
public record GetRecruitResponse(

        Recruit recruit
) {
}
