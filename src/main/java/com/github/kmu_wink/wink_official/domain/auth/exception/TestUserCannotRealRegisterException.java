package com.github.kmu_wink.wink_official.domain.auth.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class TestUserCannotRealRegisterException extends ApiException {

    public TestUserCannotRealRegisterException() {

        super(HttpStatus.BAD_REQUEST, "테스트 유저는 실제 가입을 진행할 수 없습니다.");
    }
}
