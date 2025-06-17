package com.github.kmu_wink.wink_official_page.domain.recruit.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class NotValidInterviewDatesException extends ApiException {

    public NotValidInterviewDatesException() {

        super(HttpStatus.BAD_REQUEST, "면접 기간이 올바르지 않습니다.");
    }
}
