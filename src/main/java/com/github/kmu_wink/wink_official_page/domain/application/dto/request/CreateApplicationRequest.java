package com.github.kmu_wink.wink_official_page.domain.application.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record CreateApplicationRequest(

        @NotBlank
        String name
) {

}
