package com.github.kmu_wink.wink_official_backend.domain.auth.exception;

import com.github.kmu_wink.wink_official_backend.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidPasswordResetTokenException extends ApiException {

    public InvalidPasswordResetTokenException() {

        super(HttpStatus.UNAUTHORIZED, "유효하지 않은 비밀번호 초기화 토큰입니다.");
    }
}
