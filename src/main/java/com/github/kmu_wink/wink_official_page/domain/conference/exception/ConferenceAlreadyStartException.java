package com.github.kmu_wink.wink_official_page.domain.conference.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class ConferenceAlreadyStartException extends ApiException {

    public ConferenceAlreadyStartException() {

        super(HttpStatus.BAD_REQUEST, "정기 회의가 이미 시작되었습니다.");
    }
}
