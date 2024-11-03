package com.github.kmu_wink.wink_official.domain.auth.exception;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidRefreshTokenException extends ApiException {

    public InvalidRefreshTokenException() {

        super(HttpStatus.BAD_REQUEST, "유효하지 않은 리프레시 토큰입니다.");
    }
}
