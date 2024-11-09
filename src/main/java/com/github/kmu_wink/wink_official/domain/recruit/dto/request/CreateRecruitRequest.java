package com.github.kmu_wink.wink_official.domain.recruit.dto.request;

import com.github.kmu_wink.wink_official.common.validation.Validation;

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
        @Pattern(regexp = Validation.YYYY_MM_DD_HH_MM_EXPRESSION, message = Validation.YYYY_MM_DD_HH_MM_MESSAGE)
        String recruitStartDateTime,

        @NotBlank
        @Pattern(regexp = Validation.YYYY_MM_DD_HH_MM_EXPRESSION, message = Validation.YYYY_MM_DD_HH_MM_MESSAGE)
        String recruitEndDateTime,

        @NotBlank
        @Pattern(regexp = Validation.YYYY_MM_DD_EXPRESSION, message = Validation.YYYY_MM_DD_MESSAGE)
        String interviewStartDate,

        @NotBlank
        @Pattern(regexp = Validation.YYYY_MM_DD_EXPRESSION, message = Validation.YYYY_MM_DD_MESSAGE)
        String interviewEndDate
) {
}
