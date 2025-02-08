package com.github.kmu_wink.wink_official.domain.user.dto.request;

import com.github.kmu_wink.wink_official.common.validation.Validation;
import com.github.kmu_wink.wink_official.common.validation.custom.Enum;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record UpdateRequest(

        @NotBlank
        String name,

        @NotBlank
        @Size(min=8, max=8, message = Validation.STUDENT_ID_MESSAGE)
        String studentId,

        @NotBlank
        @Pattern(regexp = Validation.KOOKMIN_EMAIL_EXPRESSION, message = Validation.KOOKMIN_EMAIL_MESSAGE)
        String email,

        @NotBlank
        @Pattern(regexp = Validation.PHONE_NUMBER_EXPRESSION, message = Validation.PHONE_NUMBER_MESSAGE)
        String phoneNumber,

        @NotBlank
        @Enum(enumClass = User.Role.class)
        String role,

        @NotNull
        boolean fee
) {
}
