package com.github.kmu_wink.wink_official.domain.recruit.dto.request;

import com.github.kmu_wink.wink_official.common.validation.Validation;
import com.github.kmu_wink.wink_official.common.validation.custom.Enum;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

import java.util.List;

@Builder
public record ApplicationRequest(

        @NotBlank
        String recruitId,

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

        @NotBlank
        @Length(min = 30, max = 300)
        String jiwonDonggi,

        @NotBlank
        @Length(min = 30, max = 300)
        String baeugoSipeunJeom,

        @NotBlank
        @Length(min = 1)
        List<@Pattern(regexp = Validation.YYYY_MM_DD_EXPRESSION, message = Validation.YYYY_MM_DD_MESSAGE) String> canInterviewDates,

        @NotBlank
        @Enum(enumClass = Application.Domain.class)
        String domain,

        @NotBlank
        @Pattern(regexp = Validation.GITHUB_EXPRESSION, message = Validation.GITHUB_MESSAGE)
        String github,

        @Nullable
        List<@Enum(enumClass = Application.FrontendTechStack.class) String> frontendTechStacks,

        @Nullable
        List<@Enum(enumClass = Application.BackendTechStack.class) String> backendTechStacks,

        @Nullable
        List<@Enum(enumClass = Application.DatabaseTechStack.class) String> databaseTechStacks,

        @Nullable
        List<@Enum(enumClass = Application.DevOpsTechStack.class) String> devOpsTechStacks,

        @Nullable
        List<@Enum(enumClass = Application.DesignTools.class) String> designTools,

        @Nullable
        String favoriteProject,

        @Nullable
        String lastComment
) {
}
