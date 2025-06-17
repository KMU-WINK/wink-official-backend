package com.github.kmu_wink.wink_official_page.domain.recruit.admin.sms.dto.request;

import com.github.kmu_wink.wink_official_page.domain.recruit.admin.sms.constant.TestSmsField;
import com.github.kmu_wink.wink_official_page.global.util.validation.RegExp;
import com.github.kmu_wink.wink_official_page.global.util.validation.custom.Enum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record SendTestSmsRequest(

    @NotBlank
    @Pattern(regexp = RegExp.PHONE_NUMBER_EXPRESSION, message = RegExp.PHONE_NUMBER_MESSAGE)
    String phoneNumber,

    @NotBlank
    @Enum(enumClass = TestSmsField.class)
    String field
) {
}
