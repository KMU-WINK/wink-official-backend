package com.github.kmu_wink.wink_official_page.domain.program.history.__admin__.dto.request;

import com.github.kmu_wink.wink_official_page.global.util.RegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record CreateHistoryRequest(

        @NotBlank
        String title,

        @NotBlank
        @Pattern(regexp = RegExp.URL_EXPRESSION, message = RegExp.URL_MESSAGE)
        String image,

        @NotNull
        LocalDate date
) {

}
