package com.github.kmu_wink.wink_official.domain.recruit.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class ItsPaperFailedException extends ApiException {

    public ItsPaperFailedException() {

        super(HttpStatus.BAD_REQUEST, "서류에서 탈락된 지원자입니다.");
    }
}
