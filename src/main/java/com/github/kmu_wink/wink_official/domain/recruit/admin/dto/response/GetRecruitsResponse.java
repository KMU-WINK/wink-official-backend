package com.github.kmu_wink.wink_official.domain.recruit.admin.dto.response;

import java.util.List;

import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;

import lombok.Builder;

@Builder
public record GetRecruitsResponse(

        List<Recruit> recruits
) {
}
