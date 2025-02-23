package com.github.kmu_wink.wink_official.domain.survey.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class SurveyNotFoundException extends ApiException {

	public SurveyNotFoundException() {

		super(HttpStatus.NOT_FOUND, "설문을 찾을 수 없습니다");
	}
}
