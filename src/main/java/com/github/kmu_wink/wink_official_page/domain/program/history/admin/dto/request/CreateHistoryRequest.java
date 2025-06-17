package com.github.kmu_wink.wink_official_page.domain.program.history.admin.dto.request;

import com.github.kmu_wink.wink_official_page.global.util.validation.RegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record CreateHistoryRequest(

        @NotBlank
        String title,

        @NotBlank
        @Pattern(regexp = RegExp.URL_EXPRESSION, message = RegExp.URL_MESSAGE)
        String image,

        @NotBlank
        @Pattern(regexp = RegExp.YYYY_MM_DD_EXPRESSION, message = RegExp.YYYY_MM_DD_MESSAGE)
        String date
) {

}
