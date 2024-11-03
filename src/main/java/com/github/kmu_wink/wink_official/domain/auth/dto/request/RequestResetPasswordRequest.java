package com.github.kmu_wink.wink_official.domain.auth.dto.request;

import com.github.kmu_wink.wink_official.common.regexp.RegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record RequestResetPasswordRequest(

        @NotBlank
        @Pattern(regexp = RegExp.KOOKMIN_EMAIL_EXPRESSION, message = RegExp.KOOKMIN_EMAIL_MESSAGE)
        String email
) {
}
