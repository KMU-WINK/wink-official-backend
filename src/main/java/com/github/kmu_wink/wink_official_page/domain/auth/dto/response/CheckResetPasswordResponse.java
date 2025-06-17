package com.github.kmu_wink.wink_official_page.domain.auth.dto.response;

import lombok.Builder;

@Builder
public record CheckResetPasswordResponse(

        boolean isValid
) {
}
