package com.github.son_daehyeon.domain.auth.exception;

import com.github.son_daehyeon.global.api.ApiException;
import org.springframework.http.HttpStatus;

public class AccessTokenExpiredException extends ApiException {

    public AccessTokenExpiredException() {

        super(HttpStatus.UNAUTHORIZED, "액세스 토큰이 만료되었습니다.");
    }
}
