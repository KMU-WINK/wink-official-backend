package com.github.kmu_wink.wink_official_page.domain.recruit.admin.sms.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class RemainSmsLackException extends ApiException {

    public RemainSmsLackException() {

        super(HttpStatus.BAD_REQUEST, "전송 가능한 SMS 크레딧이 부족합니다.");
    }
}
