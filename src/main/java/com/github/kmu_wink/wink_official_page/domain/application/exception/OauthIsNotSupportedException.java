package com.github.kmu_wink.wink_official_page.domain.application.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class OauthIsNotSupportedException extends ApiException {

    public OauthIsNotSupportedException() {

        super(HttpStatus.BAD_REQUEST, "애플리케이션이 로그인 기능을 지원하지 않습니다.");
    }
}
