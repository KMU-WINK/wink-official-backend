package com.github.kmu_wink.wink_official_page.domain.conference.__admin__.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateConferenceRequest(

        @NotBlank
        String location,

        @NotNull
        LocalDateTime date
) {

}
