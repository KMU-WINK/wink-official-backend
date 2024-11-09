package com.github.kmu_wink.wink_official.domain.recruit.exception;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AlreadyApplicationException extends ApiException {

    public AlreadyApplicationException() {

        super(HttpStatus.CONFLICT, "이미 지원된 상태입니다.");
    }
}
