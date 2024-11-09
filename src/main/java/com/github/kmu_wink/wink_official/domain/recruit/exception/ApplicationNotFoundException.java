package com.github.kmu_wink.wink_official.domain.recruit.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class ApplicationNotFoundException extends ApiException {

    public ApplicationNotFoundException() {

        super(HttpStatus.NOT_FOUND, "Application을 찾을 수 없습니다.");
    }
}
