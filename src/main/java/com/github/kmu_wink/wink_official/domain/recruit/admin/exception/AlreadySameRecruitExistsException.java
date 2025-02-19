package com.github.kmu_wink.wink_official.domain.recruit.admin.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class AlreadySameRecruitExistsException extends ApiException {

    public AlreadySameRecruitExistsException() {

        super(HttpStatus.CONFLICT, "이미 해당 학년도, 학기의 모집이 존재합니다.");
    }
}
