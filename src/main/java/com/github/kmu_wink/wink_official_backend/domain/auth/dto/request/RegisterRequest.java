package com.github.kmu_wink.wink_official_backend.domain.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record RegisterRequest(

        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@kookmin\\.ac\\.kr$")
        String email,

        @NotBlank
        @Pattern(regexp = "^[가-힣]{2,4}$")
        String name,

        @NotBlank
        @Pattern(regexp = "^[0-9]{8}$")
        String studentId,

        @NotBlank
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)\\S{8,}$")
        String password,

        @NotBlank
        @Pattern(regexp = "^[A-Z0-9]{6}$")
        String verifyCode
) {
}
