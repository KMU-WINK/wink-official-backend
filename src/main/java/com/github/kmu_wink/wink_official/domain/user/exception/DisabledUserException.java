package com.github.kmu_wink.wink_official.domain.user.exception;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class DisabledUserException extends ApiException {

    public DisabledUserException() {

        super(HttpStatus.BAD_REQUEST, "비활성화된 계정입니다.");
    }
}
