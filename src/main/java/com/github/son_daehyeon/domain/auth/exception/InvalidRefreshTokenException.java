package com.github.son_daehyeon.domain.auth.exception;

import org.springframework.http.HttpStatus;

import com.github.son_daehyeon.common.api.ApiException;

public class InvalidRefreshTokenException extends ApiException {

    public InvalidRefreshTokenException() {

        super(HttpStatus.BAD_REQUEST, "유효하지 않은 리프레시 토큰입니다.");
    }
}
