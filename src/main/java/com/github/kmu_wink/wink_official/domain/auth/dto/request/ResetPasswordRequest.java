package com.github.kmu_wink.wink_official.domain.auth.dto.request;

import com.github.kmu_wink.wink_official.common.regexp.RegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record ResetPasswordRequest(

        @NotBlank
        String token,

        @NotBlank
        @Pattern(regexp = RegExp.PASSWORD_EXPRESSION, message = RegExp.PASSWORD_MESSAGE)
        String newPassword
) {
}
