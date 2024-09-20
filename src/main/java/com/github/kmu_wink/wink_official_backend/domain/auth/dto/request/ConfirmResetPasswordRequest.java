package com.github.kmu_wink.wink_official_backend.domain.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record ConfirmResetPasswordRequest(

        @NotBlank
        String passwordResetToken,

        @NotBlank
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)\\S{8,}$")
        String newPassword
) {
}
