package com.github.kmu_wink.wink_official_page.domain.auth.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AccessTokenExpiredException extends ApiException {

    public AccessTokenExpiredException() {

        super(HttpStatus.UNAUTHORIZED, "엑세스 토큰이 만료되었습니다.");
    }
}
