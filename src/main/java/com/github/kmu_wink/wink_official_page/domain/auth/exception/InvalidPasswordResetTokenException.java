package com.github.kmu_wink.wink_official_page.domain.auth.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidPasswordResetTokenException extends ApiException {

    public InvalidPasswordResetTokenException() {

        super(HttpStatus.BAD_REQUEST, "유효하지 않은 비밀번호 초기화 토큰입니다.");
    }
}
