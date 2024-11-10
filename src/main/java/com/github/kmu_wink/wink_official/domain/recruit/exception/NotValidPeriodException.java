package com.github.kmu_wink.wink_official.domain.recruit.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class NotValidPeriodException extends ApiException {

    public NotValidPeriodException() {

        super(HttpStatus.BAD_REQUEST, "모집 기간이 아닙니다.");
    }
}
