package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AdminRecruitSmsExceptionCode implements ApiExceptionCode {
    MESSAGE_IS_EMPTY("전송할 메시지가 비어있습니다."),
    LACK_SMS_CREDIT("전송 가능한 SMS 크레딧이 부족합니다."),
    ;

    private final String message;
}
