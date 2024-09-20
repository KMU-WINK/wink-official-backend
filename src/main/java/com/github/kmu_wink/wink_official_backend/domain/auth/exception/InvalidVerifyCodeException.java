package com.github.kmu_wink.wink_official_backend.domain.auth.exception;

import com.github.kmu_wink.wink_official_backend.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidVerifyCodeException extends ApiException {

    public InvalidVerifyCodeException() {

        super(HttpStatus.BAD_REQUEST, "유효하지 않은 인증 코드입니다.");
    }
}
