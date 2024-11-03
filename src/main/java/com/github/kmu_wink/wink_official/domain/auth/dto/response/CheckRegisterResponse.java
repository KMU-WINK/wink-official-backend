package com.github.kmu_wink.wink_official.domain.auth.dto.response;

import com.github.kmu_wink.wink_official.domain.user.schema.PreUser;
import lombok.Builder;

@Builder
public record CheckRegisterResponse(

        boolean isValid,

        PreUser user
) {
}
