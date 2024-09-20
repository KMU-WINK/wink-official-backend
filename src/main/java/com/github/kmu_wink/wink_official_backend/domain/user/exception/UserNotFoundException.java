package com.github.kmu_wink.wink_official_backend.domain.user.exception;

import com.github.kmu_wink.wink_official_backend.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class UserNotFoundException extends ApiException {

    public UserNotFoundException() {

        super(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다.");
    }
}
