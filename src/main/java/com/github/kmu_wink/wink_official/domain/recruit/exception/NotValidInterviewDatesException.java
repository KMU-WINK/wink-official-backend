package com.github.kmu_wink.wink_official.domain.recruit.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class NotValidInterviewDatesException extends ApiException {

    public NotValidInterviewDatesException() {

        super(HttpStatus.BAD_REQUEST, "면접 기간이 올바르지 않습니다.");
    }
}
