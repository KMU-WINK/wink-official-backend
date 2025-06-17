package com.github.kmu_wink.wink_official_page.domain.application.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class OauthTokenNotFoundException extends ApiException {

    public OauthTokenNotFoundException() {

        super(HttpStatus.NOT_FOUND, "Oauth Token값을 찾을 수 없습니다.");
    }
}
