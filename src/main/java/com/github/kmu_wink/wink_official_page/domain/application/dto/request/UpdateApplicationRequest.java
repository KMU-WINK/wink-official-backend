package com.github.kmu_wink.wink_official_page.domain.application.dto.request;

import com.github.kmu_wink.wink_official_page.global.util.validation.RegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record UpdateApplicationRequest(

        @NotBlank
        String name,

        @NotBlank
        @Pattern(regexp = RegExp.URL_EXPRESSION, message = RegExp.URL_MESSAGE)
        String img
) {

}
