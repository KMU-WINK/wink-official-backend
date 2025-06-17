package com.github.kmu_wink.wink_official_page.domain.recruit.admin.dto.response;

import com.github.kmu_wink.wink_official_page.domain.recruit.schema.Recruit;
import lombok.Builder;

import java.util.List;

@Builder
public record GetRecruitsResponse(

        List<Recruit> recruits
) {

}
