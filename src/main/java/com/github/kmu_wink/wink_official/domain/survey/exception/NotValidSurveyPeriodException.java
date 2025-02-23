package com.github.kmu_wink.wink_official.domain.survey.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class NotValidSurveyPeriodException extends ApiException {

    public NotValidSurveyPeriodException() {

        super(HttpStatus.BAD_REQUEST, "설문 기간이 아닙니다.");
    }
}
