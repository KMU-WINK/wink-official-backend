package com.github.kmu_wink.wink_official_page.domain.recruit.admin.sms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record UpdateRecruitSmsRequest(

        @NotBlank
        String paperFail,

        @NotBlank
        String paperPass,

        @NotBlank
        String finalFail,

        @NotBlank
        String finalPass
) {
}
