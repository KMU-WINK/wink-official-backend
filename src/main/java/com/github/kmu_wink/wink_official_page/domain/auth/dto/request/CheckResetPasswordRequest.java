package com.github.kmu_wink.wink_official_page.domain.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record CheckResetPasswordRequest(

        @NotBlank
        String token
) {
}
