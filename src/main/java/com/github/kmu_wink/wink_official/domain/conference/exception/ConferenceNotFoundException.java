package com.github.kmu_wink.wink_official.domain.conference.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class ConferenceNotFoundException extends ApiException {

	public ConferenceNotFoundException() {

		super(HttpStatus.NOT_FOUND, "정기 회의를 찾을 수 없습니다.");
	}
}
