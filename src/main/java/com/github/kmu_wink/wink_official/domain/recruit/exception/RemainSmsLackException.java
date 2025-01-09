package com.github.kmu_wink.wink_official.domain.recruit.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class RemainSmsLackException extends ApiException {

    public RemainSmsLackException() {

        super(HttpStatus.BAD_REQUEST, "전송 가능한 SMS 크레딧이 부족합니다.");
    }
}
