package com.github.kmu_wink.wink_official.domain.recruit.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class AlreadyInterviewEndedException extends ApiException {

    public AlreadyInterviewEndedException() {

        super(HttpStatus.BAD_REQUEST, "면접 결과가 확정된 상태입니다.");
    }
}
