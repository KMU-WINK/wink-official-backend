package com.github.kmu_wink.wink_official_page.domain.auth.dto.response;

import com.github.kmu_wink.wink_official_page.domain.user.schema.PreUser;
import lombok.Builder;

@Builder
public record CheckRegisterResponse(

        boolean isValid,

        PreUser user
) {

}
