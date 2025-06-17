package com.github.kmu_wink.wink_official_page.domain.auth.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AlreadyRegisteredException extends ApiException {

    public AlreadyRegisteredException() {

        super(HttpStatus.CONFLICT, "이미 가입된 유저입니다.");
    }
}
