package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.dto.request;

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
