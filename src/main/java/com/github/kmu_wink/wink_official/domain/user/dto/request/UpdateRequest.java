package com.github.kmu_wink.wink_official.domain.user.dto.request;

import org.hibernate.validator.constraints.Length;

import com.github.kmu_wink.wink_official.common.validation.Validation;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record UpdateRequest(

        @NotBlank
        String name,

        @NotBlank
        @Length(min=8, max=8, message = Validation.STUDENT_ID_MESSAGE)
        String studentId,

        @NotBlank
        @Pattern(regexp = Validation.KOOKMIN_EMAIL_EXPRESSION, message = Validation.KOOKMIN_EMAIL_MESSAGE)
        String email,

        @NotBlank
        @Pattern(regexp = Validation.PHONE_NUMBER_EXPRESSION, message = Validation.PHONE_NUMBER_MESSAGE)
        String phoneNumber,

        @Nullable
        @Length(max = 40)
        String description,

        @Nullable
        @Pattern(regexp = Validation.GITHUB_EXPRESSION, message = Validation.GITHUB_MESSAGE)
        String github,

        @Nullable
        @Pattern(regexp = Validation.INSTAGRAM_EXPRESSION, message = Validation.INSTAGRAM_MESSAGE)
        String instagram,

        @Nullable
        @Pattern(regexp = Validation.BLOG_EXPRESSION, message = Validation.BLOG_MESSAGE)
        String blog,

        @NotNull
        boolean active
) {
}
