package com.github.kmu_wink.wink_official.domain.recruit.admin.form.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class AlreadyPaperEndedException extends ApiException {

    public AlreadyPaperEndedException() {

        super(HttpStatus.BAD_REQUEST, "서류 결과가 확정된 상태입니다.");
    }
}
