
package com.github.kmu_wink.wink_official.domain.recruit.dto.request;

import com.github.kmu_wink.wink_official.common.validation.Validation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record PhoneNumberCheckRequest(

        @NotBlank
        @Pattern(regexp = Validation.PHONE_NUMBER_EXPRESSION, message = Validation.PHONE_NUMBER_MESSAGE)
        String phoneNumber
) {
}
