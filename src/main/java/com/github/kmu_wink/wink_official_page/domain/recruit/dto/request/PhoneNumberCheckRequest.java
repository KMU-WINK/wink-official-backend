package com.github.kmu_wink.wink_official_page.domain.recruit.dto.request;

import com.github.kmu_wink.wink_official_page.global.util.RegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record PhoneNumberCheckRequest(

        @NotBlank
        @Pattern(regexp = RegExp.PHONE_NUMBER_EXPRESSION, message = RegExp.PHONE_NUMBER_MESSAGE)
        String phoneNumber
) {

}
