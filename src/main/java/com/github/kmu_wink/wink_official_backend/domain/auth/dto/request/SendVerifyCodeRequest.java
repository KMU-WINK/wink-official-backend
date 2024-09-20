package com.github.kmu_wink.wink_official_backend.domain.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record SendVerifyCodeRequest(

        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@kookmin\\.ac\\.kr$")
        String email
) {
}
