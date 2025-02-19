package com.github.kmu_wink.wink_official.domain.recruit.admin.form.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class NowIsRecruitingException extends ApiException {

    public NowIsRecruitingException() {

        super(HttpStatus.BAD_REQUEST, "모집 기간이 종료 후 가능합니다.");
    }
}
