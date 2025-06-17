package com.github.kmu_wink.wink_official_page.domain.recruit.dto.request;

import com.github.kmu_wink.wink_official_page.domain.recruit.constant.techStack.BackendTechStack;
import com.github.kmu_wink.wink_official_page.domain.recruit.constant.techStack.DesignTechStack;
import com.github.kmu_wink.wink_official_page.domain.recruit.constant.techStack.DevOpsTechStack;
import com.github.kmu_wink.wink_official_page.domain.recruit.constant.techStack.FrontendTechStack;
import com.github.kmu_wink.wink_official_page.domain.recruit.util.validation.DepartmentValidate;
import com.github.kmu_wink.wink_official_page.global.util.validation.RegExp;
import com.github.kmu_wink.wink_official_page.global.util.validation.custom.Enum;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.List;

@Builder
public record RecruitFormRequest(

        @NotBlank
        @Pattern(regexp = RegExp.NAME_EXPRESSION, message = RegExp.NAME_MESSAGE)
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
        @Size(min = 300, max = 500)
        String jiwonDonggi,

        @NotBlank
        @Size(min = 300, max = 500)
        String selfIntroduce,

        @NotNull
        List<@NotBlank String> outings,

        @NotNull
        @Size(min = 1, max = 100)
        List<@Pattern(regexp = RegExp.YYYY_MM_DD_EXPRESSION, message = RegExp.YYYY_MM_DD_MESSAGE) String> interviewDates,

        @Nullable
        String whyCannotInterview,

        @Nullable
        @Pattern(regexp = RegExp.GITHUB_USERNAME_EXPRESSION, message = RegExp.GITHUB_USERNAME_MESSAGE)
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
        @Size(min = 100, max = 1000)
        String favoriteProject
) {
}
