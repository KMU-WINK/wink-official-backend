package com.github.kmu_wink.wink_official.domain.recruit.admin.form.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class SmsMessageIsEmptyException extends ApiException {

    public SmsMessageIsEmptyException() {

        super(HttpStatus.NOT_FOUND, "SMS 안내 문구가 설정되어있지 않습니다.");
    }
}
