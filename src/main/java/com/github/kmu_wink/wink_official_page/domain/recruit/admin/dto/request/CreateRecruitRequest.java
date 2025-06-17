package com.github.kmu_wink.wink_official_page.domain.recruit.admin.dto.request;

import com.github.kmu_wink.wink_official_page.global.util.validation.RegExp;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record CreateRecruitRequest(

        @Min(2000)
        @Max(2999)
        int year,

        @Min(1)
        @Max(2)
        int semester,

        @NotBlank
        @Pattern(regexp = RegExp.YYYY_MM_DD_EXPRESSION, message = RegExp.YYYY_MM_DD_MESSAGE)
        String recruitStartDate,

        @NotBlank
        @Pattern(regexp = RegExp.YYYY_MM_DD_EXPRESSION, message = RegExp.YYYY_MM_DD_MESSAGE)
        String recruitEndDate,

        @NotBlank
        @Pattern(regexp = RegExp.YYYY_MM_DD_EXPRESSION, message = RegExp.YYYY_MM_DD_MESSAGE)
        String interviewStartDate,

        @NotBlank
        @Pattern(regexp = RegExp.YYYY_MM_DD_EXPRESSION, message = RegExp.YYYY_MM_DD_MESSAGE)
        String interviewEndDate
) {
}
