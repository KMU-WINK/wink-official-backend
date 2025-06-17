package com.github.kmu_wink.wink_official_page.domain.program.activity.admin.dto.request;

import com.github.kmu_wink.wink_official_page.global.util.validation.RegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

import java.util.List;

@Builder
public record CreateActivityRequest(

        @NotBlank
        String title,

        @NotBlank
        String description,

        @NotNull
        List<@Pattern(regexp = RegExp.URL_EXPRESSION, message = RegExp.URL_MESSAGE) String> images
) {

}
