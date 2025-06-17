package com.github.kmu_wink.wink_official_page.domain.recruit.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class NotValidRecruitPeriodException extends ApiException {

    public NotValidRecruitPeriodException() {

        super(HttpStatus.BAD_REQUEST, "모집 기간이 아닙니다.");
    }
}
