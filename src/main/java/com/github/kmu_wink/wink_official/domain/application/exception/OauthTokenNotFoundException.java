package com.github.kmu_wink.wink_official.domain.application.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class OauthTokenNotFoundException extends ApiException {

    public OauthTokenNotFoundException() {

        super(HttpStatus.NOT_FOUND, "Oauth Token값을 찾을 수 없습니다.");
    }
}
