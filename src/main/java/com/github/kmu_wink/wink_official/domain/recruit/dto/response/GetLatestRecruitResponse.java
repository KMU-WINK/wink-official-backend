package com.github.kmu_wink.wink_official.domain.recruit.dto.response;

import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import lombok.Builder;

@Builder
public record GetLatestRecruitResponse(

        Recruit recruit
) {
}
