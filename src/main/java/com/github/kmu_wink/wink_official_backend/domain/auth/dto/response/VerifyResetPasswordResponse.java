package com.github.kmu_wink.wink_official_backend.domain.auth.dto.response;

import lombok.Builder;

@Builder
public record VerifyResetPasswordResponse(

        boolean isVerified
) {
}
