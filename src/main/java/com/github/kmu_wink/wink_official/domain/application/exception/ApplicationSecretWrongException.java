package com.github.kmu_wink.wink_official.domain.application.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class ApplicationSecretWrongException extends ApiException {

    public ApplicationSecretWrongException() {

        super(HttpStatus.BAD_REQUEST, "잘못된 애플리케이션 시크릿 값입니다.");
    }
}
