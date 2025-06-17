package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.sms.dto.request;

import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.sms.constant.TestSmsField;
import com.github.kmu_wink.wink_official_page.global.util.RegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record SendTestSmsRequest(

        @NotBlank
        @Pattern(regexp = RegExp.PHONE_NUMBER_EXPRESSION, message = RegExp.PHONE_NUMBER_MESSAGE)
        String phoneNumber,

        @NotNull
        TestSmsField field
) {

}
