package com.github.kmu_wink.wink_official.domain.recruit.admin.form.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class RecruitFormNotFoundException extends ApiException {

    public RecruitFormNotFoundException() {

        super(HttpStatus.NOT_FOUND, "지원서를 찾을 수 없습니다.");
    }
}
