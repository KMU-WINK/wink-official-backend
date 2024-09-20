package com.github.kmu_wink.wink_official_backend.domain.user.exception;

import com.github.kmu_wink.wink_official_backend.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class NotApprovedUserException extends ApiException {

    public NotApprovedUserException() {

        super(HttpStatus.FORBIDDEN, "승인되지 않은 사용자입니다.");
    }
}
