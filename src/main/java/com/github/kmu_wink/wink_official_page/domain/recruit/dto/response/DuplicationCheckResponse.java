package com.github.kmu_wink.wink_official_page.domain.recruit.dto.response;

import lombok.Builder;

@Builder
public record DuplicationCheckResponse(

        boolean duplicated
) {

}
