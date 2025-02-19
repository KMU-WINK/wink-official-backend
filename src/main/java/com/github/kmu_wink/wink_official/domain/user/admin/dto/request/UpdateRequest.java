package com.github.kmu_wink.wink_official.domain.user.admin.dto.request;

import com.github.kmu_wink.wink_official.common.validation.RegExp;
import com.github.kmu_wink.wink_official.common.validation.custom.Enum;
import com.github.kmu_wink.wink_official.domain.recruit.util.validation.DepartmentValidate;
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
        @Size(min=8, max=8, message = RegExp.STUDENT_ID_MESSAGE)
        String studentId,

        @NotBlank
        @DepartmentValidate
        String department,

        @NotBlank
        @Pattern(regexp = RegExp.KOOKMIN_EMAIL_EXPRESSION, message = RegExp.KOOKMIN_EMAIL_MESSAGE)
        String email,

        @NotBlank
        @Pattern(regexp = RegExp.PHONE_NUMBER_EXPRESSION, message = RegExp.PHONE_NUMBER_MESSAGE)
        String phoneNumber,

        @NotBlank
        @Enum(enumClass = User.Role.class)
        String role,

        @NotNull
        boolean fee
) {
}
