package com.github.kmu_wink.wink_official.domain.recruit.dto.response;

import lombok.Builder;

@Builder
public record DuplicationCheckResponse(

        boolean duplicated
) {
}
