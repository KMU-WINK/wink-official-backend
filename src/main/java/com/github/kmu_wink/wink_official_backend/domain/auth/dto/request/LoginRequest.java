package com.github.kmu_wink.wink_official_backend.domain.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record LoginRequest(

        @NotBlank
        String email,

        @NotBlank
        String password
) {
}
