package com.github.kmu_wink.wink_official_backend.domain.auth.exception;

import com.github.kmu_wink.wink_official_backend.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AlreadyRegisteredEmailException extends ApiException {

    public AlreadyRegisteredEmailException() {

        super(HttpStatus.CONFLICT, "이미 가입된 이메일입니다.");
    }
}
