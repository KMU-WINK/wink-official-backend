package com.github.kmu_wink.wink_official.domain.recruit.dto.request;

import java.util.List;

import com.github.kmu_wink.wink_official.common.validation.Validation;
import com.github.kmu_wink.wink_official.common.validation.custom.Enum;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.BackendTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DesignTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DevOpsTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.FrontendTechStack;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record RecruitFormRequest(

        @NotBlank
        @Pattern(regexp = Validation.NAME_EXPRESSION, message = Validation.NAME_MESSAGE)
        String name,

        @NotBlank
        @Size(min=8, max=8, message = Validation.STUDENT_ID_MESSAGE)
        String studentId,

        @NotBlank
        String department,

        @NotBlank
        @Pattern(regexp = Validation.KOOKMIN_EMAIL_EXPRESSION, message = Validation.KOOKMIN_EMAIL_MESSAGE)
        String email,

        @NotBlank
        @Pattern(regexp = Validation.PHONE_NUMBER_EXPRESSION, message = Validation.PHONE_NUMBER_MESSAGE)
        String phoneNumber,

        @NotBlank
        @Size(min = 100, max = 500)
        String jiwonDonggi,

        @NotBlank
        @Size(min = 100, max = 500)
        String selfIntroduce,

        @NotNull
        List<@NotBlank String> outings,

        @NotNull
        @Size(min = 1, max = 100)
        List<@Pattern(regexp = Validation.YYYY_MM_DD_EXPRESSION, message = Validation.YYYY_MM_DD_MESSAGE) String> interviewDates,

        @Nullable
        @Pattern(regexp = Validation.GITHUB_USERNAME_EXPRESSION, message = Validation.GITHUB_USERNAME_MESSAGE)
        String github,

        @NotNull
        List<@Enum(enumClass = FrontendTechStack.class) String> frontendTechStacks,

        @NotNull
        List<@Enum(enumClass = BackendTechStack.class) String> backendTechStacks,

        @NotNull
        List<@Enum(enumClass = DevOpsTechStack.class) String> devOpsTechStacks,

        @NotNull
        List<@Enum(enumClass = DesignTechStack.class) String> designTechStacks,

        @Nullable
        String favoriteProject
) {
}
