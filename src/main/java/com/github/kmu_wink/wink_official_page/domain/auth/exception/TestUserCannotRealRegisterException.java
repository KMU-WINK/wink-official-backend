package com.github.kmu_wink.wink_official_page.domain.auth.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class TestUserCannotRealRegisterException extends ApiException {

    public TestUserCannotRealRegisterException() {

        super(HttpStatus.BAD_REQUEST, "테스트 유저는 실제 가입을 진행할 수 없습니다.");
    }
}
