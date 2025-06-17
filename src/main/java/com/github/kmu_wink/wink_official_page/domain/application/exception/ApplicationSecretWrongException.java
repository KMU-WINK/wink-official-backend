package com.github.kmu_wink.wink_official_page.domain.application.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class ApplicationSecretWrongException extends ApiException {

    public ApplicationSecretWrongException() {

        super(HttpStatus.BAD_REQUEST, "잘못된 애플리케이션 시크릿 값입니다.");
    }
}
