package com.github.kmu_wink.wink_official_page.domain.recruit.admin.form.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class SmsMessageIsEmptyException extends ApiException {

    public SmsMessageIsEmptyException() {

        super(HttpStatus.NOT_FOUND, "SMS 안내 문구가 설정되어있지 않습니다.");
    }
}
