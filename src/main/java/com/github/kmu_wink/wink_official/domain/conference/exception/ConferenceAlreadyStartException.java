package com.github.kmu_wink.wink_official.domain.conference.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class ConferenceAlreadyStartException extends ApiException {

	public ConferenceAlreadyStartException() {

		super(HttpStatus.BAD_REQUEST, "정기 회의가 이미 시작되었습니다.");
	}
}
