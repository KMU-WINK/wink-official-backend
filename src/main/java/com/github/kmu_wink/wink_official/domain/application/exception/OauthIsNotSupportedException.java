package com.github.kmu_wink.wink_official.domain.application.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class OauthIsNotSupportedException extends ApiException {

    public OauthIsNotSupportedException() {

        super(HttpStatus.BAD_REQUEST, "애플리케이션이 로그인 기능을 지원하지 않습니다.");
    }
}
