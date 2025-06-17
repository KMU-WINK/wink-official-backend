package com.github.kmu_wink.wink_official_page.domain.recruit.dto.request;

import com.github.kmu_wink.wink_official_page.global.util.RegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record EmailCheckRequest(

        @NotBlank
        @Pattern(regexp = RegExp.KOOKMIN_EMAIL_EXPRESSION, message = RegExp.KOOKMIN_EMAIL_MESSAGE)
        String email
) {

}
