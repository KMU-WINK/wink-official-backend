package com.github.kmu_wink.wink_official.domain.recruit.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class InvalidRecruitFormException extends ApiException {

    public InvalidRecruitFormException() {

        super(HttpStatus.BAD_REQUEST, "잘못된 지원 양식입니다.");
    }
}
