package com.github.kmu_wink.wink_official.domain.user.dto.request;

import com.github.kmu_wink.wink_official.common.validation.Validation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record UpdateMyPasswordRequest(

        @NotBlank
        String password,

        @NotBlank
        @Pattern(regexp = Validation.PASSWORD_EXPRESSION, message = Validation.PASSWORD_MESSAGE)
        String newPassword
) {
}
