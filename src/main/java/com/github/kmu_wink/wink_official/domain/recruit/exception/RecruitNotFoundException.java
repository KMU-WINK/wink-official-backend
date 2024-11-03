package com.github.kmu_wink.wink_official.domain.recruit.exception;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class RecruitNotFoundException extends ApiException {

    public RecruitNotFoundException() {

        super(HttpStatus.NOT_FOUND, "Recruit을 찾을 수 없습니다.");
    }
}
