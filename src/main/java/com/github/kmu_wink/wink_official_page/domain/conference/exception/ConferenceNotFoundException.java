package com.github.kmu_wink.wink_official_page.domain.conference.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class ConferenceNotFoundException extends ApiException {

	public ConferenceNotFoundException() {

		super(HttpStatus.NOT_FOUND, "정기 회의를 찾을 수 없습니다.");
	}
}
