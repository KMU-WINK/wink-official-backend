package com.github.kmu_wink.wink_official.domain.recruit.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class AlreadyChangedPassStateException extends ApiException {

    public AlreadyChangedPassStateException() {

        super(HttpStatus.NOT_FOUND, "합격 여부를 수정할 수 없습니다.");
    }
}
