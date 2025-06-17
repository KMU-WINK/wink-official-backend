package com.github.kmu_wink.wink_official_page.domain.application.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class ApplicationNotFoundException extends ApiException {

    public ApplicationNotFoundException() {

        super(HttpStatus.NOT_FOUND, "애플리케이션을 찾을 수 없습니다.");
    }
}
