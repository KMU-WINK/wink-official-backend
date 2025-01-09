package com.github.kmu_wink.wink_official.domain.recruit.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record FinalizePaperRequest(

        @NotBlank
        String interviewUrl
) {
}
