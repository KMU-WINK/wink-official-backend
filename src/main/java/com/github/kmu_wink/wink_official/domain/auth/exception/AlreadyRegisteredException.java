package com.github.kmu_wink.wink_official.domain.auth.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class AlreadyRegisteredException extends ApiException {

    public AlreadyRegisteredException() {

        super(HttpStatus.CONFLICT, "이미 가입된 유저입니다.");
    }
}
