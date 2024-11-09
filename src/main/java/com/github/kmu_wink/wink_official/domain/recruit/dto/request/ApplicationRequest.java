package com.github.kmu_wink.wink_official.domain.recruit.dto.request;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.github.kmu_wink.wink_official.common.validation.Validation;
import com.github.kmu_wink.wink_official.common.validation.custom.Enum;
import com.github.kmu_wink.wink_official.domain.recruit.constant.Domain;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.BackendTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DatabaseTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DevOpsTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.FrontendTechStack;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record ApplicationRequest(

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

        @NotNull
        List<@Pattern(regexp = Validation.YYYY_MM_DD_EXPRESSION, message = Validation.YYYY_MM_DD_MESSAGE) String> canInterviewDates,

        @NotNull
        List<@Enum(enumClass = Domain.class) String> domains,

        @Nullable
        @Pattern(regexp = Validation.GITHUB_EXPRESSION, message = Validation.GITHUB_MESSAGE)
        String github,

        @Nullable
        List<@Enum(enumClass = FrontendTechStack.class) String> frontendTechStacks,

        @Nullable
        List<@Enum(enumClass = BackendTechStack.class) String> backendTechStacks,

        @Nullable
        List<@Enum(enumClass = DatabaseTechStack.class) String> databaseTechStacks,

        @Nullable
        List<@Enum(enumClass = DevOpsTechStack.class) String> devOpsTechStacks,

        @Nullable
        List<@Enum(enumClass = DevOpsTechStack.class) String> designTechStacks,

        @Nullable
        String favoriteProject,

        @Nullable
        String lastComment
) {
}
