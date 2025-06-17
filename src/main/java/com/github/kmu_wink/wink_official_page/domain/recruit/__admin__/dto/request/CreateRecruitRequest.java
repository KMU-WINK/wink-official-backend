package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record CreateRecruitRequest(

        @Min(2000)
        @Max(2999)
        int year,

        @Min(1)
        @Max(2)
        int semester,

        @NotNull
        LocalDate recruitStartDate,

        @NotNull
        LocalDate recruitEndDate,

        @NotNull
        LocalDate interviewStartDate,

        @NotNull
        LocalDate interviewEndDate
) {

}
